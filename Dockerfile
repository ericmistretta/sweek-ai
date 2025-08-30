# Multi-stage build for Sweek-AI customized Open WebUI
FROM node:20-alpine AS frontend-builder

# Install dependencies for frontend build
RUN apk add --no-cache git python3 make g++

# Clone Open WebUI source
RUN git clone https://github.com/open-webui/open-webui.git /app
WORKDIR /app

# Copy custom frontend modifications if any
COPY ./custom/frontend /app/src/lib/custom

# Build frontend
WORKDIR /app/src
RUN npm ci && npm run build

# Python backend stage
FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Copy from frontend builder
COPY --from=frontend-builder /app/backend /app/backend
COPY --from=frontend-builder /app/build /app/build

# Install Python dependencies
WORKDIR /app/backend
RUN pip install --no-cache-dir -r requirements.txt

# Copy custom backend modifications
COPY ./custom/backend /app/backend/custom
COPY ./custom/characters /app/backend/characters

# Create necessary directories
RUN mkdir -p /app/backend/data/uploads \
    /app/backend/data/cache \
    /app/backend/data/vector_db \
    /app/backend/static

# Copy startup script
COPY ./scripts/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Environment variables
ENV OLLAMA_HOST="http://ollama:11434" \
    WEBUI_SECRET_KEY="" \
    DATA_DIR="/app/backend/data" \
    STATIC_DIR="/app/backend/static" \
    FRONTEND_BUILD_DIR="/app/build"

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

# Run the application
ENTRYPOINT ["/entrypoint.sh"]
CMD ["python", "main.py"]