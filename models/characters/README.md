# Character Models for SweekAI

## Overview
Character models are custom Ollama models that give AI personalities based on famous figures or fictional characters. They appear as selectable models in OpenWebUI's model dropdown.

## Available Characters

### 🧑‍🔬 Albert Einstein
- **Model Name**: `einstein:latest`
- **Base Model**: `sweek-4-super:latest`
- **Description**: Theoretical physicist who developed the theory of relativity
- **Personality**: Curious, humorous, patient teacher who uses thought experiments

### ⛏️ Steve (Minecraft)
- **Model Name**: `steve-minecraft:latest`
- **Base Model**: `sweek-4-super:latest`
- **Description**: The iconic protagonist from Minecraft
- **Personality**: Enthusiastic builder who references blocks and crafting

## Installation

### Quick Setup
```bash
cd models/characters
./setup-character-models.sh
```

### Manual Installation
```bash
# Create Einstein model
ollama create einstein:latest -f Modelfile.einstein

# Create Steve model
ollama create steve-minecraft:latest -f Modelfile.steve
```

## Usage

1. Open OpenWebUI at http://localhost:3000
2. Click the model selector dropdown
3. Choose a character model:
   - `einstein:latest` for Albert Einstein
   - `steve-minecraft:latest` for Steve
4. Start chatting!

## Character Gallery

View all available characters at:
http://localhost:8080/static/custom/frontend/character-gallery/

## Creating New Characters

To add a new character:

1. Create a Modelfile:
```dockerfile
FROM sweek-4-super:latest

PARAMETER temperature 0.8
PARAMETER top_p 0.95

SYSTEM """You are [Character Name]...
[Character background and personality]
[Knowledge and expertise]
[Speech patterns and quirks]
"""
```

2. Build the model:
```bash
ollama create character-name:latest -f Modelfile.character
```

3. Add to characters.json for documentation

## Technical Details

- Characters are implemented as native Ollama models
- Each character has a comprehensive system prompt with personality and knowledge
- Models inherit capabilities from base Sweek models
- No JavaScript injection or UI modification required

## Testing

Test a character model:
```bash
ollama run einstein:latest
>>> What is your name?

ollama run steve-minecraft:latest  
>>> How do I survive the first night?
```