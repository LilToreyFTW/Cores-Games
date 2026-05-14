@echo off
setlocal

cd /d "%~dp0"

if not exist node_modules (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo Failed to install dependencies.
    pause
    exit /b 1
  )
)

if "%PORT%"=="" set PORT=4001

echo Starting Cores Games realtime server on port %PORT%...
call npm run start

if errorlevel 1 (
  echo Server exited with an error.
  pause
  exit /b 1
)
