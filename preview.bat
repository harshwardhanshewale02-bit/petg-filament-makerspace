@echo off
title Makerspace PETG Filament Project Showcase
echo ========================================================
echo   Sanjivani University Makerspace Project
echo   Design & Development of 3D Printing Filament from PETG Bottles
echo ========================================================
echo.

set "NODE=C:\Users\harsh\AppData\Local\AppLab\resources\node\node.exe"
set "VITE=%~dp0node_modules\vite\bin\vite.js"
set "PROJ=%~dp0"

cd /d "%PROJ%"

echo Starting local server...
echo Server running at: http://localhost:4173
echo.
echo Opening website in your default browser...
start "" "http://localhost:4173"

"%NODE%" "%VITE%" preview --host 0.0.0.0 --port 4173

pause
