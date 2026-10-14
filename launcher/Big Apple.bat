@echo off
chcp 65001 >nul
title Big Apple
cd /d "%~dp0.."
where node >nul 2>nul || (echo Нужен Node.js: https://nodejs.org & pause & exit /b 1)
if not exist node_modules (echo Устанавливаю зависимости... & call npm install)
if not exist dist\index.html (echo Собираю игру... & call npm run build)
echo Запускаю Big Apple... Не закрывай это окно, пока играешь.
start "" /min cmd /c "npx vite preview --port 4173 --strictPort"
timeout /t 3 /nobreak >nul
rem Открываем в отдельном окне без адресной строки (Edge есть в каждой Windows 10/11)
start "" msedge --app=http://localhost:4173 2>nul || start "" http://localhost:4173
