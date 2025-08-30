# Sweek-AI

An AI-powered conversational platform with customizable personalities and characters, built on Open WebUI.

## Features

- Multiple AI models support (Llama, Code Llama, etc.)
- Character-based interactions (Einstein, Newton, gaming characters)
- Local LLM support via Ollama
- Web-based interface powered by Open WebUI
- Mobile-responsive design

## Tech Stack

- **Frontend**: Open WebUI
- **Backend**: Ollama for local LLMs
- **Models**: 
  - Llama 3.2 1B
  - Llama 3.1 8B
  - Code Llama 13B
- **Infrastructure**: Docker

## Getting Started

### Prerequisites

- Docker Desktop
- Ollama
- 16GB+ RAM recommended

### Installation

1. Install Ollama
2. Pull desired models: `ollama pull llama3.1:8b`
3. Run Open WebUI: `docker run -d -p 3000:8080 ghcr.io/open-webui/open-webui:main`
4. Access at http://localhost:3000

## Development

This project aims to create a character-based AI chat system with personalities ranging from historical figures to gaming characters.

## License

MIT