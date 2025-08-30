#!/bin/bash

# Sweek-AI Quick Start Script
set -e

echo "╔══════════════════════════════════════╗"
echo "║        Sweek-AI Setup Wizard         ║"
echo "╚══════════════════════════════════════╝"
echo ""

# Check for Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "   Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check for Docker Compose
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose."
    echo "   Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating environment configuration..."
    cp .env.example .env
    
    # Generate a random secret key
    SECRET_KEY=$(openssl rand -base64 32 2>/dev/null || cat /dev/urandom | head -c 32 | base64)
    if [ "$(uname)" == "Darwin" ]; then
        # macOS
        sed -i '' "s/change-this-to-a-random-secret-key-in-production/$SECRET_KEY/g" .env
    else
        # Linux
        sed -i "s/change-this-to-a-random-secret-key-in-production/$SECRET_KEY/g" .env
    fi
    
    echo "✅ Environment file created"
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p open-webui-data custom/frontend custom/backend custom/characters models init-db

# Check if this is first run
if [ ! -f ".initialized" ]; then
    echo ""
    echo "🚀 First time setup detected!"
    echo ""
    echo "Would you like to download the AI models now?"
    echo "This will download ~10GB of data and may take 10-30 minutes."
    echo ""
    read -p "Download models now? (y/n): " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        DOWNLOAD_MODELS=true
    else
        DOWNLOAD_MODELS=false
        echo "⚠️  Models will be downloaded on first use (may be slow)"
    fi
    
    touch .initialized
else
    DOWNLOAD_MODELS=false
fi

# Start services
echo ""
echo "🐳 Starting Docker containers..."

# Use docker compose or docker-compose depending on what's available
if docker compose version &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
else
    DOCKER_COMPOSE="docker-compose"
fi

# Start core services
$DOCKER_COMPOSE up -d ollama postgres redis nginx

# Wait for Ollama to be ready
echo "⏳ Waiting for Ollama to start..."
sleep 10

# Start Open WebUI
echo "🌐 Starting Open WebUI..."
$DOCKER_COMPOSE up -d open-webui

# Download models if requested
if [ "$DOWNLOAD_MODELS" = true ]; then
    echo ""
    echo "📥 Downloading AI models..."
    echo "This may take a while. You can start using the app while models download."
    echo ""
    
    # Run model setup in background
    $DOCKER_COMPOSE --profile setup up model-setup &
    MODEL_PID=$!
    
    echo "Models are downloading in the background (PID: $MODEL_PID)"
    echo "You can check progress with: docker logs sweek-ai-model-setup -f"
fi

# Wait for services to be fully ready
echo ""
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check service health
echo ""
echo "🔍 Checking service status..."
echo ""

# Function to check if a service is running
check_service() {
    if docker ps | grep -q "$1"; then
        echo "✅ $2 is running"
        return 0
    else
        echo "❌ $2 failed to start"
        return 1
    fi
}

# Check all services
ALL_GOOD=true
check_service "sweek-ai-ollama" "Ollama (AI Engine)" || ALL_GOOD=false
check_service "sweek-ai-webui" "Open WebUI (Interface)" || ALL_GOOD=false
check_service "sweek-ai-postgres" "PostgreSQL (Database)" || ALL_GOOD=false
check_service "sweek-ai-redis" "Redis (Cache)" || ALL_GOOD=false
check_service "sweek-ai-nginx" "Nginx (Web Server)" || ALL_GOOD=false

echo ""
if [ "$ALL_GOOD" = true ]; then
    echo "╔══════════════════════════════════════╗"
    echo "║   🎉 Sweek-AI is ready to use! 🎉   ║"
    echo "╚══════════════════════════════════════╝"
    echo ""
    echo "📱 Access the application at:"
    echo "   → http://localhost:3000 (via Open WebUI)"
    echo "   → http://localhost (via Nginx)"
    echo ""
    echo "🔑 Default admin credentials:"
    echo "   Email: admin@sweek-ai.com"
    echo "   Password: admin (change this immediately!)"
    echo ""
    echo "📚 Useful commands:"
    echo "   View logs:        docker-compose logs -f"
    echo "   Stop services:    docker-compose down"
    echo "   Restart services: docker-compose restart"
    echo "   Model status:     docker logs sweek-ai-model-setup -f"
    echo ""
    echo "🎭 Available characters will appear once models are downloaded."
    echo ""
else
    echo "⚠️  Some services failed to start. Check logs with:"
    echo "   docker-compose logs"
    exit 1
fi