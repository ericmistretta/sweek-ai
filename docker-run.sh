#!/bin/bash

# Sweek-AI Docker Run Script with Custom Branding

echo "Starting Sweek-AI with custom branding..."

# Create volume for persistent data if it doesn't exist
docker volume create sweek-ai-data

# Run Open WebUI with custom branding
docker run -d \
  -p 3000:8080 \
  --add-host=host.docker.internal:host-gateway \
  -v "$(pwd)/open-webui-data:/app/backend/data" \
  -v "$(pwd)/assets/logos:/app/static/logos:ro" \
  -v "$(pwd)/assets/logos:/app/backend/static/logos:ro" \
  -v "$(pwd)/custom:/app/static/custom:ro" \
  -v "$(pwd)/assets/logos/favicon.ico:/app/static/favicon.ico:ro" \
  -v "$(pwd)/assets/logos/favicon.ico:/app/backend/static/favicon.ico:ro" \
  -v "$(pwd)/assets/logos/sweek-ai-logo-dark.svg:/app/static/logo-dark.svg:ro" \
  -v "$(pwd)/assets/logos/sweek-ai-logo.svg:/app/static/logo.svg:ro" \
  --name sweek-ai-webui \
  -e WEBUI_NAME="Sweek-AI" \
  -e WEBUI_AUTH_TRUSTED_EMAIL_HEADER="" \
  -e WEBUI_AUTH_TRUSTED_NAME_HEADER="" \
  -e DEFAULT_USER_ROLE="user" \
  -e ENABLE_COMMUNITY_SHARING="false" \
  -e ENABLE_MESSAGE_RATING="true" \
  -e DEFAULT_MODELS="codellama:13b,llama3.1:8b,llama3.2:1b" \
  -e TASK_MODEL="llama3.1:8b" \
  -e ENABLE_ADMIN_EXPORT="true" \
  -e ENABLE_LOCAL_WEB_FETCH="false" \
  -e ENABLE_IMAGE_GENERATION="false" \
  -e ENABLE_OLLAMA_API="true" \
  -e OLLAMA_BASE_URL="http://host.docker.internal:11434" \
  -e OLLAMA_BASE_URLS="http://host.docker.internal:11434" \
  -e WEBUI_DEFAULT_THEME="dark" \
  -e WEBUI_CUSTOM_LOGO_URL="/static/logos/sweek-ai-logo-dark.svg" \
  -e WEBUI_FAVICON_URL="/static/logos/favicon.ico" \
  --restart unless-stopped \
  ghcr.io/open-webui/open-webui:main

echo "Waiting for Sweek-AI to start..."
sleep 10

# Check if running
if docker ps | grep -q sweek-ai-webui; then
    echo "✅ Sweek-AI is running at http://localhost:3000"
    echo ""
    echo "Note: Clear your browser cache if you don't see the custom logo."
    echo "Try: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows/Linux)"
else
    echo "❌ Failed to start. Check logs with: docker logs sweek-ai-webui"
fi