#!/bin/bash
set -e

echo "Starting Sweek-AI Open WebUI..."

# Wait for database to be ready if using PostgreSQL
if [ ! -z "$DATABASE_URL" ]; then
    echo "Waiting for PostgreSQL to be ready..."
    until pg_isready -h postgres -p 5432 -U sweekuser; do
        echo "Waiting for database..."
        sleep 2
    done
fi

# Wait for Ollama to be ready
echo "Checking Ollama connection..."
until curl -s ${OLLAMA_HOST:-http://ollama:11434}/api/version > /dev/null; do
    echo "Waiting for Ollama service..."
    sleep 5
done
echo "Ollama is ready!"

# Initialize database if needed
if [ ! -f "/app/backend/data/.initialized" ]; then
    echo "Initializing database..."
    python /app/backend/initialize_db.py
    touch /app/backend/data/.initialized
fi

# Start the application
echo "Starting Open WebUI server..."
exec "$@"