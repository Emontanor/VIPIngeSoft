#!/bin/bash

echo "🔍 Verificando dependencias del sistema..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Instálalo primero."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm no está instalado. Instálalo primero."
    exit 1
fi

if ! command -v sqlite3 &> /dev/null; then
    echo "❌ SQLite3 no está instalado. Intenta con 'sudo pacman -S sqlite sqlite3' o equivalente."
    exit 1
fi

echo "📦 Instalando dependencias de Electron y backend..."
cd Proyecto
npm install

echo "📦 Instalando dependencias del frontend..."
cd frontend
npm install
cd ..

echo "Inicializando la base de datos..."
node init.js

echo "Iniciando la aplicación en modo desarrollo..."
npm run dev
