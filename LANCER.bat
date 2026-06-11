@echo off
title DR NEEX - Serveur Web (Vite)
color 0A

echo ===================================================
echo      LANCEMENT DU SITE DR NEEX (Vite Dev Server)
echo ===================================================
echo.

:: Se placer dans le dossier du script
cd /d "%~dp0"

:: Verification des dependances
if not exist "node_modules\" (
    echo [INFO] Les dependances Node ne sont pas installees.
    echo [INFO] Execution de "npm install" en cours...
    call npm install
    echo.
)

echo [INFO] Demarrage du serveur local...
call npm run dev

pause
