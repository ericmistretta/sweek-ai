#!/bin/bash

echo "🎨 Creating all icons from the NEW splash logo..."

# Use the sweek-ai-splash.png as source (it has the splash with text)
SOURCE="assets/logos/sweek-ai-splash.png"

# Create all favicon sizes
echo "📐 Creating favicon sizes..."
magick "$SOURCE" -resize 16x16 -background black -gravity center -extent 16x16 assets/logos/favicon-16x16.png
magick "$SOURCE" -resize 32x32 -background black -gravity center -extent 32x32 assets/logos/favicon-32x32.png  
magick "$SOURCE" -resize 48x48 -background black -gravity center -extent 48x48 assets/logos/favicon-48x48.png
magick "$SOURCE" -resize 64x64 -background black -gravity center -extent 64x64 assets/logos/favicon-64x64.png
magick "$SOURCE" -resize 96x96 -background black -gravity center -extent 96x96 assets/logos/favicon-96x96.png
magick "$SOURCE" -resize 180x180 -background black -gravity center -extent 180x180 assets/logos/apple-touch-icon.png

# Create web app manifest icons
echo "📱 Creating web app manifest icons..."
magick "$SOURCE" -resize 192x192 -background black -gravity center -extent 192x192 assets/logos/web-app-192.png
magick "$SOURCE" -resize 512x512 -background black -gravity center -extent 512x512 assets/logos/web-app-512.png

# Create standard logos
echo "🖼️ Creating standard logos..."
magick "$SOURCE" -resize 256x256 -background black -gravity center -extent 256x256 assets/logos/logo.png
magick "$SOURCE" -resize 128x128 -background black -gravity center -extent 128x128 assets/logos/logo-128.png

# Copy splash screens as-is
echo "💦 Copying splash screens..."
cp "$SOURCE" assets/logos/splash.png
cp "$SOURCE" assets/logos/splash-dark.png
cp "$SOURCE" assets/logos/favicon.png
cp "$SOURCE" assets/logos/favicon-dark.png

# Create favicon.ico
echo "🔷 Creating favicon.ico..."
magick "$SOURCE" -resize 16x16 -resize 32x32 -resize 48x48 assets/logos/favicon.ico

echo "✅ All icons created from your splash logo!"