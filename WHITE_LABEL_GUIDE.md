# Open WebUI White-Label Customization Guide for Sweek-AI

## Overview
This guide explains how to fully customize Open WebUI to create a white-labeled Sweek-AI application with custom branding, logos, and dark mode as default.

## 1. Setting Dark Mode as Default

### Method A: Environment Variable (Easiest)
Add to your `docker-compose.yml` or `.env`:

```yaml
environment:
  - DEFAULT_USER_THEME=dark  # Forces dark mode for all users
  - WEBUI_DEFAULT_THEME=dark # System-wide dark mode
```

### Method B: Custom JavaScript
Add to `/custom/frontend/init.js`:

```javascript
// Force dark mode on load
document.addEventListener('DOMContentLoaded', () => {
  localStorage.setItem('theme', 'dark');
  document.documentElement.classList.add('dark');
});
```

## 2. Logo and Icon Customization

### Required Logo Files

Create these files in `/assets/logos/`:

```
📁 assets/logos/
├── sweek-ai-logo.svg          # Main logo (light mode)
├── sweek-ai-logo-dark.svg     # Main logo (dark mode)
├── sweek-ai-icon.png          # App icon (512x512)
├── favicon.ico                # Browser tab icon
├── favicon-16x16.png          # Small favicon
├── favicon-32x32.png          # Medium favicon
├── apple-touch-icon.png       # iOS home screen (180x180)
├── android-chrome-192x192.png # Android icon
└── android-chrome-512x512.png # Android splash
```

### Logo Implementation Steps

#### Step 1: Mount Custom Assets in Docker
Update `docker-compose.yml`:

```yaml
open-webui:
  volumes:
    - ./assets/logos:/app/static/logos
    - ./custom/frontend:/app/static/custom
    - ./custom/overrides:/app/backend/static/overrides
```

#### Step 2: Override Open WebUI Templates
Create `/custom/overrides/base.html`:

```html
<!-- Custom HTML overrides -->
<link rel="icon" type="image/x-icon" href="/static/logos/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/static/logos/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/static/logos/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/static/logos/favicon-16x16.png">

<style>
  /* Override Open WebUI logo */
  .app-logo, 
  .navbar-brand img,
  img[alt="Open WebUI"] {
    display: none !important;
  }
  
  .app-logo::after,
  .navbar-brand::after {
    content: "";
    display: inline-block;
    width: 150px;
    height: 40px;
    background-image: url('/static/logos/sweek-ai-logo.svg');
    background-size: contain;
    background-repeat: no-repeat;
  }
  
  /* Dark mode logo */
  .dark .app-logo::after,
  .dark .navbar-brand::after {
    background-image: url('/static/logos/sweek-ai-logo-dark.svg');
  }
  
  /* Loading screen logo */
  .loading-logo {
    background-image: url('/static/logos/sweek-ai-icon.png') !important;
  }
</style>
```

#### Step 3: Environment Variables for Branding
Update `.env`:

```bash
# Branding
WEBUI_NAME="Sweek-AI"
WEBUI_DESCRIPTION="Chat with Character - AI Conversations with Personality"
WEBUI_LOGO_URL="/static/logos/sweek-ai-logo.svg"
WEBUI_LOGO_DARK_URL="/static/logos/sweek-ai-logo-dark.svg"
WEBUI_FAVICON_URL="/static/logos/favicon.ico"

# Dark mode default
DEFAULT_USER_THEME=dark
WEBUI_DEFAULT_THEME=dark

# Custom colors
WEBUI_PRIMARY_COLOR=#6366F1
WEBUI_SECONDARY_COLOR=#8B5CF6
WEBUI_ACCENT_COLOR=#EC4899
```

## 3. Complete White-Label Dockerfile

Create `Dockerfile.whitelabel`:

```dockerfile
FROM ghcr.io/open-webui/open-webui:main

# Install dependencies for image manipulation
RUN apt-get update && apt-get install -y imagemagick

# Copy custom branding assets
COPY ./assets/logos /app/static/logos
COPY ./custom /app/custom

# Replace Open WebUI branding in the source
RUN find /app -type f -name "*.html" -exec sed -i 's/Open WebUI/Sweek-AI/g' {} \; && \
    find /app -type f -name "*.js" -exec sed -i 's/Open WebUI/Sweek-AI/g' {} \; && \
    find /app -type f -name "*.json" -exec sed -i 's/Open WebUI/Sweek-AI/g' {} \;

# Override favicon and icons
RUN cp /app/static/logos/favicon.ico /app/static/favicon.ico && \
    cp /app/static/logos/sweek-ai-icon.png /app/static/logo.png && \
    cp /app/static/logos/apple-touch-icon.png /app/static/apple-touch-icon.png

# Custom CSS injection
RUN echo '<link rel="stylesheet" href="/static/custom/sweek-ai.css">' >> /app/backend/templates/base.html

# Set environment variables
ENV WEBUI_NAME="Sweek-AI" \
    DEFAULT_USER_THEME="dark" \
    WEBUI_DEFAULT_THEME="dark"

EXPOSE 8080
```

## 4. Custom CSS for Complete Branding

Create `/custom/frontend/sweek-ai.css`:

```css
/* Sweek-AI Complete Branding */

:root {
  --primary-color: #6366F1;
  --secondary-color: #8B5CF6;
  --accent-color: #EC4899;
  --brand-gradient: linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%);
}

/* Hide all Open WebUI references */
[title*="Open WebUI"],
[alt*="Open WebUI"],
.open-webui-logo {
  display: none !important;
}

/* Custom header branding */
.main-header,
.navbar {
  background: var(--brand-gradient) !important;
}

/* Custom logo in all locations */
.logo-container::before,
.brand-logo::before,
.app-title::before {
  content: "";
  display: inline-block;
  width: 140px;
  height: 35px;
  background: url('/static/logos/sweek-ai-logo-dark.svg') no-repeat center;
  background-size: contain;
  margin-right: 10px;
}

/* Loading screen customization */
.loading-screen {
  background: #1F2937 !important;
}

.loading-screen::before {
  content: "";
  display: block;
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
  background: url('/static/logos/sweek-ai-icon.png') no-repeat center;
  background-size: contain;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Login page branding */
.auth-page .logo {
  background: url('/static/logos/sweek-ai-logo.svg') !important;
  width: 200px !important;
  height: 60px !important;
}

/* Dark mode specific */
.dark .auth-page .logo {
  background: url('/static/logos/sweek-ai-logo-dark.svg') !important;
}

/* Remove Open WebUI footer */
footer [href*="openwebui"],
footer [href*="github.com/open-webui"] {
  display: none !important;
}

/* Add Sweek-AI footer */
footer::after {
  content: "Powered by Sweek-AI © 2024";
  display: block;
  text-align: center;
  color: #9CA3AF;
  margin-top: 10px;
}

/* Browser tab title - handled via JavaScript */
```

## 5. JavaScript for Dynamic Branding

Create `/custom/frontend/branding.js`:

```javascript
// Complete white-label branding script
(function() {
  // Change page title
  document.title = 'Sweek-AI - Chat with Character';
  
  // Update meta tags
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.content = 'Sweek-AI: AI-powered conversations with personality';
  }
  
  // Force dark mode
  localStorage.setItem('theme', 'dark');
  document.documentElement.classList.add('dark');
  
  // Replace any remaining "Open WebUI" text
  function replaceText() {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    
    let node;
    while (node = walker.nextNode()) {
      if (node.nodeValue.includes('Open WebUI')) {
        node.nodeValue = node.nodeValue.replace(/Open WebUI/g, 'Sweek-AI');
      }
    }
  }
  
  // Run on page load and mutations
  replaceText();
  const observer = new MutationObserver(replaceText);
  observer.observe(document.body, { childList: true, subtree: true });
  
  // Update favicon dynamically
  const favicon = document.querySelector('link[rel="icon"]');
  if (favicon) {
    favicon.href = '/static/logos/favicon.ico';
  }
})();
```

## 6. PWA Manifest for Mobile

Create `/custom/manifest.json`:

```json
{
  "name": "Sweek-AI",
  "short_name": "Sweek-AI",
  "description": "Chat with Character - AI Conversations with Personality",
  "start_url": "/",
  "display": "standalone",
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
    },
    {
      "src": "/static/logos/sweek-ai-icon.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

## 7. Complete Docker Compose Configuration

```yaml
version: '3.8'

services:
  open-webui:
    build:
      context: .
      dockerfile: Dockerfile.whitelabel
    container_name: sweek-ai-webui
    environment:
      # Branding
      - WEBUI_NAME=Sweek-AI
      - WEBUI_DESCRIPTION=Chat with Character
      - DEFAULT_USER_THEME=dark
      - WEBUI_DEFAULT_THEME=dark
      
      # Custom paths
      - WEBUI_LOGO_URL=/static/logos/sweek-ai-logo.svg
      - WEBUI_LOGO_DARK_URL=/static/logos/sweek-ai-logo-dark.svg
      - WEBUI_FAVICON_URL=/static/logos/favicon.ico
      
      # Colors
      - WEBUI_PRIMARY_COLOR=#6366F1
      - WEBUI_SECONDARY_COLOR=#8B5CF6
    
    volumes:
      - ./assets:/app/static/assets
      - ./custom:/app/custom
      - ./custom/overrides:/app/overrides
```

## 8. Quick Setup Script

Create `setup-branding.sh`:

```bash
#!/bin/bash

echo "🎨 Setting up Sweek-AI white-label branding..."

# Create necessary directories
mkdir -p assets/logos custom/frontend custom/overrides

# Copy placeholder logo if no custom logo exists
if [ ! -f "assets/logos/sweek-ai-logo.svg" ]; then
  cp assets/logos/sweek-ai-logo-placeholder.svg assets/logos/sweek-ai-logo.svg
  echo "✅ Using placeholder logo (replace with your custom logo)"
fi

# Generate favicons from main logo
if command -v convert &> /dev/null; then
  convert assets/logos/sweek-ai-icon.png -resize 16x16 assets/logos/favicon-16x16.png
  convert assets/logos/sweek-ai-icon.png -resize 32x32 assets/logos/favicon-32x32.png
  convert assets/logos/sweek-ai-icon.png -resize 180x180 assets/logos/apple-touch-icon.png
  echo "✅ Generated favicon variants"
fi

# Build white-label Docker image
docker build -f Dockerfile.whitelabel -t sweek-ai:custom .

echo "🚀 White-label branding setup complete!"
echo "Start with: docker-compose up"
```

## 9. Testing Your White-Label

1. **Check logo appears correctly**:
   - Header logo
   - Login page
   - Loading screen
   - Browser tab favicon

2. **Verify dark mode**:
   - Should be default for new users
   - Logo should switch to dark variant

3. **Confirm text replacement**:
   - No "Open WebUI" text visible
   - "Sweek-AI" appears throughout

4. **Mobile PWA**:
   - Install as app on phone
   - Check app icon and splash screen

## Troubleshooting

- **Logo not showing**: Check volume mounts and file paths
- **Dark mode not default**: Clear browser cache and localStorage
- **Text not replaced**: Ensure JavaScript is loaded and check console
- **PWA not working**: Verify manifest.json is served correctly

## Support

For issues with white-labeling, check:
1. Docker logs: `docker logs sweek-ai-webui`
2. Browser console for JavaScript errors
3. Network tab for 404s on logo files