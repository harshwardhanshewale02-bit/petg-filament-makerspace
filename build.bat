@echo off
title PET Filament Website - Build
echo ============================================
echo  Makerspace PET Filament Project Website
echo  Building for PRODUCTION...
echo ============================================
echo.

set "NODE=C:\Users\harsh\AppData\Local\OpenAI\Codex\runtimes\cua_node\1fb7137c46617d50\bin\node.exe"
set "VITE=%~dp0node_modules\vite\bin\vite.js"
set "PROJ=%~dp0"

cd /d "%PROJ%"

echo Building project...
echo.

"%NODE%" "%VITE%" build

echo.
echo ============================================
echo  Build complete! Files are in the dist/ folder.
echo  Run preview.bat to preview the production build.
echo ============================================
pause
