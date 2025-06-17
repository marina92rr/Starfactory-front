#!/bin/bash

echo "========== INICIANDO DEPLOY =========="

# Moverse al directorio del proyecto (ajusta esta ruta)
cd /ruta/a/tu/proyecto || { echo "❌ Error: No se pudo acceder al directorio del proyecto"; exit 1; }

# Actualización del repositorio
echo "📥 Ejecutando git fetch..."
git fetch

echo "📥 Ejecutando git pull..."
git pull

# Instalación de dependencias
echo "📦 Ejecutando npm install..."
npm install

# Construcción del proyecto
echo "🏗️ Ejecutando npm run build..."
npm run build

# Recarga de Nginx
echo "🔄 Recargando Nginx..."
sudo systemctl reload nginx

echo "✅ DEPLOY COMPLETADO"