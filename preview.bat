@echo off
cd /d "%~dp0"
title SANS TOI MAMIE preview
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0preview-server.ps1"
pause
