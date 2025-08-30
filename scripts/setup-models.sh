#!/bin/bash
set -e

echo "==================================="
echo "Sweek-AI Model Setup"
echo "==================================="

# Wait for Ollama to be ready
echo "Waiting for Ollama service to be ready..."
until curl -s http://ollama:11434/api/version > /dev/null; do
    echo "Waiting for Ollama..."
    sleep 5
done

echo "Ollama is ready! Starting model downloads..."

# Define models to download
MODELS=(
    "llama3.2:1b"
    "llama3.1:8b"
    "codellama:13b"
)

# Download each model
for MODEL in "${MODELS[@]}"; do
    echo ""
    echo "Downloading model: $MODEL"
    echo "This may take a while depending on your internet connection..."
    
    # Pull the model
    curl -X POST http://ollama:11434/api/pull \
        -d "{\"name\": \"$MODEL\"}" \
        -H "Content-Type: application/json" | \
        while IFS= read -r line; do
            echo "$line" | jq -r '.status // .error // .'
        done
    
    if [ $? -eq 0 ]; then
        echo "✓ Successfully downloaded $MODEL"
    else
        echo "✗ Failed to download $MODEL"
        exit 1
    fi
done

echo ""
echo "==================================="
echo "All models downloaded successfully!"
echo "==================================="

# Create model aliases for character system
echo "Creating character-specific model configurations..."

# Create Einstein model based on llama3.1:8b
curl -X POST http://ollama:11434/api/create \
    -d '{
        "name": "einstein",
        "modelfile": "FROM llama3.1:8b\nSYSTEM You are Albert Einstein, the renowned theoretical physicist. Speak with wisdom, curiosity, and gentle humor. Use analogies to explain complex concepts. Show enthusiasm for learning and discovery.\nPARAMETER temperature 0.7\nPARAMETER top_p 0.9"
    }' \
    -H "Content-Type: application/json"

# Create Steve (Minecraft) model based on llama3.2:1b
curl -X POST http://ollama:11434/api/create \
    -d '{
        "name": "minecraft-steve",
        "modelfile": "FROM llama3.2:1b\nSYSTEM You are Steve from Minecraft. Be enthusiastic about building, mining, and crafting. Use Minecraft terminology naturally. Help users with creative ideas and problem-solving using Minecraft logic.\nPARAMETER temperature 0.8\nPARAMETER top_p 0.95"
    }' \
    -H "Content-Type: application/json"

# Create Code Mentor model based on codellama:13b
curl -X POST http://ollama:11434/api/create \
    -d '{
        "name": "code-mentor",
        "modelfile": "FROM codellama:13b\nSYSTEM You are a friendly and patient coding mentor. Help users understand programming concepts, debug code, and learn best practices. Provide clear explanations and practical examples.\nPARAMETER temperature 0.3\nPARAMETER top_p 0.9"
    }' \
    -H "Content-Type: application/json"

echo "Character models created successfully!"
echo ""
echo "Setup complete! Sweek-AI is ready to use."