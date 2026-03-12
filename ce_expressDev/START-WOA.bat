@echo off
REM Navigate to the folder of this script
cd /d %~dp0

echo [SYSTEM] Checking environment...

node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [!] ERROR: Node.js was not found.
    echo Ce requires the Node.js runtime to power the WOA service.
    echo.
    echo Please install it from: https://nodejs.org/
    echo.
    pause
    exit
)

echo [SYSTEM] Node.js detected. Awakening the server...
REM Open index.html in default browser
start "" "interface\index.html"

REM Start the server and KEEP the window open
node server.cjs
pause
