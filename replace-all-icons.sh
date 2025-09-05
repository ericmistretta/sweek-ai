#!/bin/bash

echo "🔄 Replacing ALL icons in Docker container with new Sweek-AI logo..."

# Replace favicon files
docker cp assets/logos/favicon.ico sweek-ai-webui:/app/backend/open_webui/static/favicon.ico
docker cp assets/logos/favicon.ico sweek-ai-webui:/app/build/static/favicon.ico

# Replace all PNG logos
docker cp assets/logos/logo.png sweek-ai-webui:/app/backend/open_webui/static/logo.png
docker cp assets/logos/logo.png sweek-ai-webui:/app/backend/open_webui/static/favicon.png
docker cp assets/logos/logo.png sweek-ai-webui:/app/backend/open_webui/static/favicon-dark.png
docker cp assets/logos/logo.png sweek-ai-webui:/app/build/static/logo.png
docker cp assets/logos/logo.png sweek-ai-webui:/app/build/static/favicon.png
docker cp assets/logos/logo.png sweek-ai-webui:/app/build/static/favicon-dark.png
docker cp assets/logos/logo.png sweek-ai-webui:/app/build/favicon.png

# Replace 96x96 favicons
docker cp assets/logos/favicon-96x96.png sweek-ai-webui:/app/backend/open_webui/static/favicon-96x96.png
docker cp assets/logos/favicon-96x96.png sweek-ai-webui:/app/build/static/favicon-96x96.png

# Replace Apple touch icon
docker cp assets/logos/apple-touch-icon.png sweek-ai-webui:/app/backend/open_webui/static/apple-touch-icon.png
docker cp assets/logos/apple-touch-icon.png sweek-ai-webui:/app/build/static/apple-touch-icon.png

# Replace SVG logos
docker cp assets/logos/favicon.svg sweek-ai-webui:/app/backend/open_webui/static/favicon.svg
docker cp assets/logos/favicon.svg sweek-ai-webui:/app/build/static/favicon.svg

# Replace splash screens with the new logo
docker cp assets/logos/splash.png sweek-ai-webui:/app/backend/open_webui/static/splash.png
docker cp assets/logos/splash-dark.png sweek-ai-webui:/app/backend/open_webui/static/splash-dark.png
docker cp assets/logos/splash.png sweek-ai-webui:/app/build/static/splash.png
docker cp assets/logos/splash-dark.png sweek-ai-webui:/app/build/static/splash-dark.png

# Replace web app manifest icons
docker cp assets/logos/web-app-192.png sweek-ai-webui:/app/build/static/web-app-manifest-192x192.png
docker cp assets/logos/web-app-512.png sweek-ai-webui:/app/build/static/web-app-manifest-512x512.png

echo "✅ All icons replaced with new Sweek-AI logo!"
echo ""
echo "🔄 Restarting container..."
docker restart sweek-ai-webui

echo ""
echo "⏳ Waiting for service to start..."
sleep 5

echo "✅ Done! Please:"
echo "1. Clear your browser cache (Cmd+Shift+Delete)"
echo "2. Hard refresh (Cmd+Shift+R)"
echo "3. Visit http://localhost:3000"