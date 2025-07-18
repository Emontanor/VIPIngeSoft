@echo off
chcp 65001

echo Verificando que Node.js esté instalado...
where node >nul 2>nul || (
    echo ❌ Node.js no está instalado. Instálalo desde https://nodejs.org/
    exit /b 1
)

echo Verificando que npm esté instalado...
where npm >nul 2>nul || (
    echo ❌ npm no está instalado.
    exit /b 1
)

echo Instalando dependencias del backend...
cd Proyecto
call npm install

echo Instalando dependencias del frontend...
cd frontend
call npm install
cd ..

echo Inicializando la base de datos...
call node init.js

echo Iniciando el proyecto en modo desarrollo...
call npm run dev
