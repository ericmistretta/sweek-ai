#!/bin/bash

# Sweek-AI White-Label Branding Setup Script

set -e

echo "╔══════════════════════════════════════╗"
echo "║   Sweek-AI White-Label Setup         ║"
echo "╚══════════════════════════════════════╝"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Create necessary directories
echo "📁 Creating directory structure..."
mkdir -p assets/logos/variants
mkdir -p custom/frontend/public
mkdir -p custom/overrides

# Check if placeholder logo exists and copy it
if [ ! -f "assets/logos/sweek-ai-logo.svg" ]; then
  if [ -f "assets/logos/sweek-ai-logo-placeholder.svg" ]; then
    echo "📋 Using placeholder logo as default..."
    cp assets/logos/sweek-ai-logo-placeholder.svg assets/logos/sweek-ai-logo.svg
    cp assets/logos/sweek-ai-logo-placeholder.svg assets/logos/sweek-ai-logo-dark.svg
    echo -e "${YELLOW}⚠️  Remember to replace with your custom logo!${NC}"
  fi
fi

# Generate PNG version from SVG if ImageMagick is available
if command -v convert &> /dev/null; then
  echo "🎨 Generating PNG versions of logos..."
  
  # Convert SVG to PNG if source exists
  if [ -f "assets/logos/sweek-ai-logo.svg" ]; then
    convert -background none -density 300 assets/logos/sweek-ai-logo.svg -resize 512x512 assets/logos/sweek-ai-icon.png
    echo "✅ Generated sweek-ai-icon.png (512x512)"
    
    # Generate different sizes
    convert assets/logos/sweek-ai-icon.png -resize 16x16 assets/logos/favicon-16x16.png
    convert assets/logos/sweek-ai-icon.png -resize 32x32 assets/logos/favicon-32x32.png
    convert assets/logos/sweek-ai-icon.png -resize 180x180 assets/logos/apple-touch-icon.png
    convert assets/logos/sweek-ai-icon.png -resize 192x192 assets/logos/android-chrome-192x192.png
    convert assets/logos/sweek-ai-icon.png -resize 512x512 assets/logos/android-chrome-512x512.png
    
    # Generate variants
    convert assets/logos/sweek-ai-icon.png -resize 128x128 assets/logos/variants/sweek-ai-logo-sm.png
    convert assets/logos/sweek-ai-icon.png -resize 256x256 assets/logos/variants/sweek-ai-logo-md.png
    convert assets/logos/sweek-ai-icon.png -resize 1024x1024 assets/logos/variants/sweek-ai-logo-lg.png
    
    echo "✅ Generated all logo variants"
  fi
  
  # Generate favicon.ico (multi-resolution)
  if [ -f "assets/logos/sweek-ai-icon.png" ]; then
    convert assets/logos/sweek-ai-icon.png -resize 16x16 assets/logos/favicon-16.png
    convert assets/logos/sweek-ai-icon.png -resize 32x32 assets/logos/favicon-32.png
    convert assets/logos/favicon-16.png assets/logos/favicon-32.png assets/logos/favicon.ico
    rm assets/logos/favicon-16.png assets/logos/favicon-32.png
    echo "✅ Generated favicon.ico"
  fi
else
  echo -e "${YELLOW}⚠️  ImageMagick not found. Install it to auto-generate logo variants.${NC}"
  echo "   Install with: brew install imagemagick"
fi

# Create custom CSS for branding
echo "🎨 Creating custom CSS..."
cat > custom/frontend/sweek-ai.css << 'EOF'
/* Sweek-AI Custom Branding CSS */
:root {
  --sweek-primary: #6366F1;
  --sweek-secondary: #8B5CF6;
  --sweek-accent: #EC4899;
  --sweek-gradient: linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%);
}

/* Force dark mode styling */
html[class*="dark"] {
  color-scheme: dark;
}

/* Custom logo implementation */
.app-logo img,
img[src*="logo.svg"],
img[alt*="Open WebUI"] {
  visibility: hidden;
  width: 0 !important;
  height: 0 !important;
}

.app-logo::before,
.navbar-brand::before {
  content: "";
  display: inline-block;
  width: 150px;
  height: 40px;
  background: url('/static/logos/sweek-ai-logo-dark.svg') no-repeat center;
  background-size: contain;
}

/* Light mode logo */
html:not(.dark) .app-logo::before,
html:not(.dark) .navbar-brand::before {
  background-image: url('/static/logos/sweek-ai-logo.svg');
}

/* Loading screen */
.loading-screen {
  background: linear-gradient(135deg, #1F2937 0%, #111827 100%) !important;
}

/* Character avatars with gradient border */
.character-avatar {
  border: 2px solid transparent;
  background: linear-gradient(white, white) padding-box,
              var(--sweek-gradient) border-box;
  border-radius: 50%;
}

/* Custom scrollbar for dark mode */
.dark ::-webkit-scrollbar {
  width: 8px;
  background: #1F2937;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4B5563;
  border-radius: 4px;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #6B7280;
}
EOF

echo "✅ Custom CSS created"

# Create JavaScript for dynamic branding
echo "📝 Creating branding JavaScript..."
cat > custom/frontend/branding.js << 'EOF'
// Sweek-AI Dynamic Branding
(function() {
  // Set dark mode as default
  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
  }
  
  // Update page title
  document.title = 'Sweek-AI - Chat with Character';
  
  // Replace Open WebUI text
  function replaceText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.nodeValue.includes('Open WebUI')) {
        node.nodeValue = node.nodeValue.replace(/Open WebUI/g, 'Sweek-AI');
      }
    } else {
      for (let child of node.childNodes) {
        replaceText(child);
      }
    }
  }
  
  // Apply on load and observe changes
  document.addEventListener('DOMContentLoaded', () => {
    replaceText(document.body);
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            replaceText(node);
          }
        });
      });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
  });
})();
EOF

echo "✅ Branding JavaScript created"

# Create PWA manifest
echo "📱 Creating PWA manifest..."
cat > custom/manifest.json << EOF
{
  "name": "Sweek-AI",
  "short_name": "Sweek-AI",
  "description": "Chat with Character - AI Conversations with Personality",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait",
  "theme_color": "#1F2937",
  "background_color": "#1F2937",
  "icons": [
    {
      "src": "/static/logos/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/static/logos/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
EOF

echo "✅ PWA manifest created"

# Update .env.example for branding
echo "🔧 Updating environment configuration..."
if [ -f ".env.example" ]; then
  if ! grep -q "WHITE_LABEL SETTINGS" .env.example; then
    cat >> .env.example << EOF

# WHITE-LABEL SETTINGS
DEFAULT_USER_THEME=dark
WEBUI_DEFAULT_THEME=dark
WEBUI_LOGO_URL=/static/logos/sweek-ai-logo.svg
WEBUI_LOGO_DARK_URL=/static/logos/sweek-ai-logo-dark.svg
WEBUI_FAVICON_URL=/static/logos/favicon.ico
EOF
    echo "✅ Updated .env.example with branding variables"
  fi
fi

# Create a simple test HTML to preview logos
echo "🖼️ Creating logo preview page..."
cat > assets/logos/preview.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Sweek-AI Logo Preview</title>
    <style>
        body {
            font-family: system-ui, -apple-system, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: #f3f4f6;
        }
        .dark-mode {
            background: #1f2937;
            color: white;
        }
        .logo-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        .logo-card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .dark-mode .logo-card {
            background: #374151;
        }
        .logo-card img {
            max-width: 100%;
            height: auto;
            margin: 10px 0;
        }
        .logo-card h3 {
            margin: 0 0 10px 0;
            font-size: 14px;
            color: #6b7280;
        }
        button {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 10px 20px;
            background: #6366f1;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <button onclick="document.body.classList.toggle('dark-mode')">Toggle Dark Mode</button>
    
    <h1>Sweek-AI Logo Preview</h1>
    <p>Preview your logos in different contexts and sizes</p>
    
    <div class="logo-grid">
        <div class="logo-card">
            <h3>Main Logo (SVG)</h3>
            <img src="sweek-ai-logo.svg" alt="Main Logo">
        </div>
        <div class="logo-card">
            <h3>Dark Mode Logo</h3>
            <img src="sweek-ai-logo-dark.svg" alt="Dark Logo">
        </div>
        <div class="logo-card">
            <h3>App Icon (512px)</h3>
            <img src="sweek-ai-icon.png" alt="App Icon" style="max-width: 128px;">
        </div>
        <div class="logo-card">
            <h3>Favicon (32px)</h3>
            <img src="favicon-32x32.png" alt="Favicon">
        </div>
        <div class="logo-card">
            <h3>Apple Touch Icon</h3>
            <img src="apple-touch-icon.png" alt="Apple Touch Icon" style="max-width: 90px;">
        </div>
        <div class="logo-card">
            <h3>Android Chrome Icon</h3>
            <img src="android-chrome-192x192.png" alt="Android Icon" style="max-width: 96px;">
        </div>
    </div>
</body>
</html>
EOF

echo "✅ Logo preview page created"

echo ""
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}✨ White-Label Setup Complete! ✨${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo ""
echo "📋 Next steps:"
echo "1. Replace placeholder logos in assets/logos/ with your custom designs"
echo "2. Preview your logos: open assets/logos/preview.html"
echo "3. Start the application: make start"
echo ""
echo "🎨 Logo locations:"
echo "   • Main logo: assets/logos/sweek-ai-logo.svg"
echo "   • Dark logo: assets/logos/sweek-ai-logo-dark.svg"
echo "   • App icon: assets/logos/sweek-ai-icon.png"
echo ""
echo "🌙 Dark mode is now set as default!"
echo ""

# Check if running
if docker ps | grep -q sweek-ai-webui; then
  echo -e "${YELLOW}⚠️  Restart the application to apply changes:${NC}"
  echo "   make restart"
fi