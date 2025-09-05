#!/bin/bash

echo "🎭 Setting up SweekAI Character System..."

# Check if container is running
if ! docker ps | grep -q sweek-ai-webui; then
    echo "❌ Container sweek-ai-webui is not running. Please start it first:"
    echo "   docker-compose up -d"
    exit 1
fi

echo "📁 Creating custom directory in container..."
docker exec sweek-ai-webui mkdir -p /app/build/static/custom

echo "📁 Copying character selector files to container..."

# Copy character selector files
docker cp custom/frontend/character-selector sweek-ai-webui:/app/build/static/custom/
docker cp custom/frontend/inject-character.js sweek-ai-webui:/app/build/static/custom/
docker cp custom/characters sweek-ai-webui:/app/build/static/custom/

# Create injection script in the container's main HTML
echo "💉 Injecting character system into Open WebUI..."

# Create a custom injection file that loads our character system
cat << 'EOF' > /tmp/character-inject.html
<!-- SweekAI Character System -->
<script>
    // Load character injection script
    (function() {
        const script = document.createElement('script');
        script.src = '/static/custom/inject-character.js';
        script.async = false;
        document.head.appendChild(script);
        console.log('[SweekAI] Character system injection initiated');
    })();
</script>
EOF

# Copy injection to container
docker cp /tmp/character-inject.html sweek-ai-webui:/tmp/character-inject.html

# Try to inject into the main template
echo "🔧 Attempting to modify Open WebUI templates..."

# Check if we can find and modify the base template
docker exec sweek-ai-webui sh -c '
if [ -f /app/backend/open_webui/templates/base.html ]; then
    echo "Found base.html, injecting character system..."
    if ! grep -q "SweekAI Character System" /app/backend/open_webui/templates/base.html; then
        cat /tmp/character-inject.html >> /app/backend/open_webui/templates/base.html
        echo "✅ Injected into base.html"
    else
        echo "⚠️ Character system already injected in base.html"
    fi
elif [ -f /app/build/index.html ]; then
    echo "Found build/index.html, injecting character system..."
    if ! grep -q "SweekAI Character System" /app/build/index.html; then
        # Add the injection before </body> tag
        sed -i "s|</body>|<script src=\"/static/custom/inject-character.js\"></script></body>|" /app/build/index.html
        echo "✅ Injected into index.html"
    else
        echo "⚠️ Character system already injected in index.html"
    fi
else
    echo "⚠️ Could not find template files to inject into"
fi
'

# Alternative: Create a custom JS file that auto-loads
echo "📝 Creating auto-loader script..."
cat << 'EOF' | docker exec -i sweek-ai-webui sh -c 'cat > /app/build/static/custom-init.js'
// SweekAI Custom Initialization
console.log('[SweekAI] Custom initialization starting...');

// Auto-load character system
if (!window.SweekCharacterLoaded) {
    window.SweekCharacterLoaded = true;
    const script = document.createElement('script');
    script.src = '/static/custom/inject-character.js';
    document.head.appendChild(script);
}
EOF

echo ""
echo "✅ Character system setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Restart the container: docker restart sweek-ai-webui"
echo "2. Clear your browser cache"
echo "3. Visit http://localhost:3000"
echo "4. Look for the character badge in the bottom-right corner"
echo ""
echo "🧪 To test the standalone selector:"
echo "   open http://localhost:3000/static/custom/character-selector/test.html"
echo ""

# Clean up
rm -f /tmp/character-inject.html