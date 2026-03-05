const express = require('express');
const multer = require('multer'); 
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const dgram = require('dgram');

// --- 1. INITIALIZE APP ENGINE ---
const app = express();
app.use(cors());
app.use(express.json());

// --- 2. AUTO-BOOTSTRAP SYSTEM ---
try {
    require.resolve('express');
} catch (e) {
    console.log("[SYSTEM] Installing dependencies...");
    execSync('npm install express multer cors node-fetch@2', { stdio: 'inherit' });
    console.log("[SYSTEM] Installation complete. Resuming first breath...");
}

// --- 3. MESH CONFIGURATION ---
const scanner = dgram.createSocket('udp4');
const bridge = dgram.createSocket('udp6'); 
const PORT = 41234; 
const IPV6_MCAST_GROUP = 'ff02::1'; 

let neighbors = new Map();
const messageInboxes = new Map();

let myHeartbeat = 0; 
let baseRate = 5000; 

// --- 4. IMAGE STORAGE ENGINE ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const section = req.body.section || 'community'; 
        const dest = path.join(__dirname, 'profile', section);
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
        cb(null, dest);
    },
    filename: (req, file, cb) => {
        const section = req.body.section || 'community';
        cb(null, `${section}-profile.jpg`);
    }
});
const upload = multer({ storage: storage });

// --- 5. IDENTITY & HANDSHAKE ---
let myPublicName = "999"; 
let myFullIdentity = "CE-NODE-000"; 

try {
    const identityPath = path.join(__dirname, 'identity.json');

    if (fs.existsSync(identityPath)) {
        const data = JSON.parse(fs.readFileSync(identityPath, 'utf8'));
        myFullIdentity = data.nodeId || "CE-NODE-000";
        myPublicName = data.first || data.name || myPublicName;
    } else {
        const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
        myFullIdentity = `CE-NODE-${uniqueSuffix}`;
        myPublicName = `${uniqueSuffix}`;

        fs.writeFileSync(
            identityPath,
            JSON.stringify({ nodeId: myFullIdentity, isLocked: false }, null, 2)
        );
    }
} catch (err) {
    console.error("Identity access restricted.");
}

// --- 6. TRUST ENGINE (Unified Intent & Persistence) ---
const karmAMap = new Map();

const DECAY_INTERVAL = 60000; 
const DECAY_RATE = 0.005;

const GAINS = {
    LISTEN: 0.025,
    OTHER: 0.005,
    UTILITY_WORK: 0.010,
    KNOCK: 0.100
};

const MIN_HUMAN_INTERVAL = 1000; 

function applyDecay() {
    const now = Date.now();

    karmAMap.forEach((data, nodeId) => {

        if (nodeId === 'self' || now - data.lastSeen < DECAY_INTERVAL) return;

        let fadedValue = Math.max(data.value - DECAY_RATE, 0.001);

        karmAMap.set(nodeId, {
            ...data,
            value: fadedValue
        });

    });
}

setInterval(applyDecay, DECAY_INTERVAL);

// --- TRUST CALCULATION ---
function calculateKarmA(nodeId, type, observedInterval = null) {

    let entry = karmAMap.get(nodeId) || {
        value: 0.1,
        lastSeen: Date.now()
    };

    // TIME FIREWALL (bot detection)
    if (observedInterval !== null && observedInterval < MIN_HUMAN_INTERVAL) {

        let penalized = Math.max(entry.value - 0.05, 0.001);

        karmAMap.set(nodeId, {
            value: penalized,
            lastSeen: Date.now()
        });

        return penalized;
    }

    let gain = GAINS[type] || GAINS.OTHER;

    let updated = Math.min(entry.value + gain, 1.0);

    karmAMap.set(nodeId, {
        value: updated,
        lastSeen: Date.now()
    });

    return updated;
}

// --- 7. ROUTES (Sovereign Interaction) ---

// Nearby nodes
app.get('/api/sidebar-data', (req, res) => {

    const prospectors = Array
        .from(neighbors.values())
        .filter(n => Date.now() - n.lastSeen < 3600000)
        .length;

    res.json({ prospectors });

});

// Pending agreements
app.get('/api/pending-agreements', (req, res) => {

    const logPath = path.join(__dirname, 'agreements_pending.json');

    if (fs.existsSync(logPath))
        res.json(JSON.parse(fs.readFileSync(logPath, 'utf8')));
    else
        res.json([]);

});

// Message retrieval
app.get('/api/get-messages/:hash', (req, res) => {

    const { hash } = req.params;

    const inbox = messageInboxes.get(hash) || [];

    messageInboxes.set(hash, []);

    res.json({ messages: inbox });

});

// --- 8. MESH BREATHING ---

function breathe() {

    myHeartbeat++;

    const pulse = Buffer.from(JSON.stringify({
        name: myPublicName,
        type: 'PULSE',
        heartbeat: myHeartbeat,
        timestamp: Date.now()
    }));

    scanner.setBroadcast(true);

    scanner.send(pulse, 0, pulse.length, PORT, '255.255.255.255');

    bridge.send(pulse, 0, pulse.length, PORT, IPV6_MCAST_GROUP);

    setTimeout(breathe, baseRate);

}

// --- MESH LISTENER ---

scanner.on('message', (msg, rinfo) => {

    try {

        const data = JSON.parse(msg.toString());

        if (data.name === myPublicName || data.from === myPublicName) return;

        if (data.type === 'PULSE') {

            const lastData = neighbors.get(data.name);

            const interval = lastData
                ? (Date.now() - lastData.lastSeen)
                : null;

            calculateKarmA(data.name, 'LISTEN', interval);

            neighbors.set(data.name, {
                id: data.name,
                ip: rinfo.address,
                lastSeen: Date.now(),
                heartbeat: data.heartbeat
            });

        }

        else if (data.type === 'INQUIRY') {

            const identityPath = path.join(__dirname, 'identity.json');

            const myData = JSON.parse(fs.readFileSync(identityPath, 'utf8'));

            if (JSON.stringify(myData).toLowerCase().includes(data.subject.toLowerCase())) {

                const logPath = path.join(__dirname, 'agreements_pending.json');

                let pending = fs.existsSync(logPath)
                    ? JSON.parse(fs.readFileSync(logPath, 'utf8'))
                    : [];

                pending.push({
                    id: Date.now(),
                    from: data.from,
                    action: data.action,
                    subject: data.subject,
                    timestamp: new Date().toISOString()
                });

                if (pending.length > 10) pending.shift();

                fs.writeFileSync(logPath, JSON.stringify(pending, null, 2));

            }
        }

        else if (data.type === 'DIRECT_MSG') {

            let inbox = messageInboxes.get(data.hash) || [];

            inbox.push(data.message);

            if (inbox.length > 50) inbox.shift();

            messageInboxes.set(data.hash, inbox);

            console.log(`\x1b[35m[INBOX]\x1b[0m Received for ${data.hash}: ${data.message}`);

        }

    } catch (e) {

        console.log("\x1b[31m[ERROR]\x1b[0m Packet interference.");

    }

});

// --- 9. STARTUP ---

app.use(express.static(path.join(__dirname, 'interface')));

scanner.bind(PORT, () => {

    scanner.setBroadcast(true);

    console.log(`\x1b[36m[UDP] Local Mesh Active on Port ${PORT}\x1b[0m`);

    breathe();

});

app.listen(3000, '0.0.0.0', () => {

    console.log(`\x1b[42m CE BRAIN ONLINE \x1b[0m`);

});
