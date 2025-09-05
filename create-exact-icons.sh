#!/bin/bash

echo "🎨 Creating all icon sizes from your EXACT logo..."

# First, let's use the sweek-ai-logo-512.png as our source since it matches your exact design
SOURCE="assets/logos/sweek-ai-logo-512.png"

# Create all required sizes from your exact logo
echo "Creating favicon sizes..."
convert "$SOURCE" -resize 16x16 assets/logos/favicon-16x16.png
convert "$SOURCE" -resize 32x32 assets/logos/favicon-32x32.png
convert "$SOURCE" -resize 48x48 assets/logos/favicon-48x48.png
convert "$SOURCE" -resize 64x64 assets/logos/favicon-64x64.png
convert "$SOURCE" -resize 96x96 assets/logos/favicon-96x96.png
convert "$SOURCE" -resize 180x180 assets/logos/apple-touch-icon.png

# Create web app manifest icons
echo "Creating web app manifest icons..."
convert "$SOURCE" -resize 192x192 assets/logos/web-app-192.png
convert "$SOURCE" -resize 512x512 assets/logos/web-app-512.png

# Create standard logo sizes
echo "Creating standard logos..."
convert "$SOURCE" -resize 256x256 assets/logos/logo.png
convert "$SOURCE" -resize 128x128 assets/logos/logo-128.png

# Use the splash image as-is since it has the text
cp assets/logos/sweek-ai-splash.png assets/logos/splash.png
cp assets/logos/sweek-ai-splash.png assets/logos/splash-dark.png

# Create favicon.ico with multiple sizes
echo "Creating favicon.ico..."
convert "$SOURCE" -resize 16x16 -resize 32x32 -resize 48x48 assets/logos/favicon.ico

echo "✅ All icons created from your EXACT logo!"
echo ""
echo "Files created:"
ls -la assets/logos/*.png assets/logos/*.ico | grep -v sweek-ai-