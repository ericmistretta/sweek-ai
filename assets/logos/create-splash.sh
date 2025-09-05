#!/bin/bash

# Create high-quality splash screen from SVG
echo "Creating high-quality splash screens..."

# Use magick (ImageMagick v7) to create PNGs with black background
magick -background black -density 600 assets/logos/sweek-ai-logo.svg -resize 512x512 -gravity center -extent 512x512 assets/logos/splash-new.png

# Create a square version with padding
magick assets/logos/splash-new.png -background black -gravity center -extent 600x600 assets/logos/splash-square.png

# Create smaller version for faster loading  
magick assets/logos/splash-new.png -resize 256x256 assets/logos/splash-small.png

echo "✅ Splash screens created!"