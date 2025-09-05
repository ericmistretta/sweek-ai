#!/bin/bash

echo "🎨 Using YOUR EXACT uploaded image to create all icon sizes..."

# Your exact uploaded image
SOURCE="assets/logos/6714802D-8323-4EDD-A3C6-0A62E0E7BB2D.PNG"

echo "📸 Using source image: $SOURCE"

# Create all favicon sizes from YOUR exact image
echo "📐 Creating favicon sizes from YOUR exact logo..."
magick "$SOURCE" -resize 16x16 -background black -gravity center -extent 16x16 assets/logos/favicon-16x16.png
magick "$SOURCE" -resize 32x32 -background black -gravity center -extent 32x32 assets/logos/favicon-32x32.png
magick "$SOURCE" -resize 48x48 -background black -gravity center -extent 48x48 assets/logos/favicon-48x48.png
magick "$SOURCE" -resize 64x64 -background black -gravity center -extent 64x64 assets/logos/favicon-64x64.png
magick "$SOURCE" -resize 96x96 -background black -gravity center -extent 96x96 assets/logos/favicon-96x96.png
magick "$SOURCE" -resize 180x180 -background black -gravity center -extent 180x180 assets/logos/apple-touch-icon.png

# Create web app manifest icons from YOUR exact image
echo "📱 Creating web app icons from YOUR exact logo..."
magick "$SOURCE" -resize 192x192 -background black -gravity center -extent 192x192 assets/logos/web-app-192.png
magick "$SOURCE" -resize 512x512 -background black -gravity center -extent 512x512 assets/logos/web-app-512.png

# Create standard logos from YOUR exact image
echo "🖼️ Creating standard logos from YOUR exact logo..."
magick "$SOURCE" -resize 256x256 -background black -gravity center -extent 256x256 assets/logos/logo.png
magick "$SOURCE" -resize 128x128 -background black -gravity center -extent 128x128 assets/logos/logo-128.png

# Use YOUR exact image for splash screens
echo "💦 Using YOUR exact logo for splash screens..."
cp "$SOURCE" assets/logos/splash.png
cp "$SOURCE" assets/logos/splash-dark.png
cp "$SOURCE" assets/logos/favicon.png
cp "$SOURCE" assets/logos/favicon-dark.png

# Create favicon.ico from YOUR exact image
echo "🔷 Creating favicon.ico from YOUR exact logo..."
magick "$SOURCE" -define icon:auto-resize=16,32,48 assets/logos/favicon.ico

echo "✅ All icons created from YOUR EXACT uploaded logo!"
echo "📁 Created files in assets/logos/:"
ls -la assets/logos/*.png assets/logos/*.ico | grep -v "6714802D"