@echo off
title PET Filament Website - Dev Server
echo ========================================================
echo   Sanjivani University Makerspace Project (Live Dev)
echo ========================================================
echo.

set "NODE=C:\Users\harsh\AppData\Local\OpenAI\Codex\runtimes\cua_node\1fb7137c46617d50\bin\node.exe"
set "VITE=%~dp0node_modules\vite\bin\vite.js"
set "PROJ=%~dp0"

cd /d "%PROJ%"

echo Starting live development server...
echo URL: http://localhost:5173
start "" "http://localhost:5173"

"%NODE%" "%VITE%" --host 0.0.0.0 --port 5173

pause
