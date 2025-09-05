#!/bin/bash

echo "🎭 SweekAI Character Models Setup"
echo "================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Ollama is running
if ! curl -s http://localhost:11434/api/version > /dev/null 2>&1; then
    echo -e "${RED}❌ Ollama is not running!${NC}"
    echo "Please start Ollama first with: ollama serve"
    exit 1
fi

echo -e "${GREEN}✅ Ollama is running${NC}"
echo ""

# Function to create a character model
create_character_model() {
    local modelfile=$1
    local model_name=$2
    local emoji=$3
    
    echo -e "${YELLOW}Creating $emoji $model_name...${NC}"
    
    if ollama list | grep -q "$model_name"; then
        echo -e "${YELLOW}⚠️  Model $model_name already exists. Removing old version...${NC}"
        ollama rm "$model_name"
    fi
    
    # Create the model
    if ollama create "$model_name" -f "$modelfile"; then
        echo -e "${GREEN}✅ Successfully created $model_name${NC}"
    else
        echo -e "${RED}❌ Failed to create $model_name${NC}"
        return 1
    fi
    
    echo ""
}

# Create Einstein model
echo "1. Creating Einstein Character Model"
echo "------------------------------------"
create_character_model "Modelfile.einstein" "einstein:latest" "🧑‍🔬"

# Create Steve model
echo "2. Creating Steve (Minecraft) Character Model"
echo "---------------------------------------------"
create_character_model "Modelfile.steve" "steve-minecraft:latest" "⛏️"

# List all models
echo "📋 Available Models:"
echo "-------------------"
ollama list

echo ""
echo "🎉 Character models setup complete!"
echo ""
echo "Usage in OpenWebUI:"
echo "  1. Open http://localhost:3000"
echo "  2. Select from model dropdown:"
echo "     - einstein:latest (🧑‍🔬 Albert Einstein)"
echo "     - steve-minecraft:latest (⛏️ Steve from Minecraft)"
echo ""
echo "Test Commands:"
echo "  ollama run einstein:latest"
echo "  ollama run steve-minecraft:latest"
echo ""