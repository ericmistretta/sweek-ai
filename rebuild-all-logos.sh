#!/bin/bash

echo "🎨 Rebuilding all Sweek-AI logos with final design..."

# Base SVG file
BASE_SVG="assets/logos/sweek-ai-final.svg"

# Create main PNG versions
echo "Creating main logo versions..."
magick -background black -density 600 "$BASE_SVG" -resize 1024x1024 assets/logos/sweek-ai-logo-1024.png
magick -background black -density 600 "$BASE_SVG" -resize 512x512 assets/logos/sweek-ai-logo-512.png
magick -background black -density 600 "$BASE_SVG" -resize 256x256 assets/logos/sweek-ai-logo-256.png
magick -background black -density 600 "$BASE_SVG" -resize 128x128 assets/logos/sweek-ai-logo-128.png

# Create splash screens
echo "Creating splash screens..."
magick -background black -density 600 "$BASE_SVG" -resize 512x512 assets/logos/splash.png
magick -background black -density 600 "$BASE_SVG" -resize 512x512 assets/logos/splash-dark.png

# Create favicons
echo "Creating favicons..."
magick -background black -density 600 "$BASE_SVG" -resize 16x16 assets/logos/favicon-16x16.png
magick -background black -density 600 "$BASE_SVG" -resize 32x32 assets/logos/favicon-32x32.png
magick -background black -density 600 "$BASE_SVG" -resize 96x96 assets/logos/favicon-96x96.png
magick -background black -density 600 "$BASE_SVG" -resize 256x256 assets/logos/favicon-256.png

# Create multi-resolution favicon.ico
magick assets/logos/favicon-16x16.png assets/logos/favicon-32x32.png assets/logos/favicon-96x96.png assets/logos/favicon.ico

# Create mobile icons
echo "Creating mobile icons..."
magick -background black -density 600 "$BASE_SVG" -resize 180x180 assets/logos/apple-touch-icon.png
magick -background black -density 600 "$BASE_SVG" -resize 192x192 assets/logos/android-chrome-192x192.png
magick -background black -density 600 "$BASE_SVG" -resize 512x512 assets/logos/android-chrome-512x512.png

# Create web app manifest icons
echo "Creating web app icons..."
magick -background black -density 600 "$BASE_SVG" -resize 192x192 assets/logos/web-app-192.png
magick -background black -density 600 "$BASE_SVG" -resize 512x512 assets/logos/web-app-512.png

# Create generic logo.png
magick -background black -density 600 "$BASE_SVG" -resize 512x512 assets/logos/logo.png

# Copy SVG files
cp "$BASE_SVG" assets/logos/sweek-ai-logo.svg
cp "$BASE_SVG" assets/logos/sweek-ai-logo-dark.svg
cp "$BASE_SVG" assets/logos/favicon.svg

echo "✅ All logo files generated successfully!"
echo ""
echo "Generated files:"
ls -lh assets/logos/*.png assets/logos/*.ico | awk '{print "  •", $9, "("$5")"}'