# Sweek-AI Makefile for common operations

.PHONY: help start stop restart logs clean build setup models status backup restore

# Default target - show help
help:
	@echo "Sweek-AI Management Commands"
	@echo "============================"
	@echo "make start      - Start all services"
	@echo "make stop       - Stop all services"
	@echo "make restart    - Restart all services"
	@echo "make logs       - View logs (all services)"
	@echo "make clean      - Stop and remove all containers/volumes"
	@echo "make build      - Build custom Docker images"
	@echo "make setup      - Initial setup (download models)"
	@echo "make models     - Download/update AI models"
	@echo "make status     - Check service status"
	@echo "make backup     - Backup data and configurations"
	@echo "make restore    - Restore from backup"

# Start all services
start:
	@echo "Starting Sweek-AI services..."
	@chmod +x start.sh
	@./start.sh

# Stop all services
stop:
	@echo "Stopping Sweek-AI services..."
	@docker-compose down

# Restart all services
restart: stop start

# View logs
logs:
	@docker-compose logs -f

# View logs for specific service
logs-%:
	@docker-compose logs -f $*

# Clean everything (careful!)
clean:
	@echo "⚠️  WARNING: This will delete all data and volumes!"
	@read -p "Are you sure? (y/n): " -n 1 -r; \
	echo ""; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		docker-compose down -v --remove-orphans; \
		rm -rf open-webui-data/* models/* .initialized; \
		echo "✅ Cleanup complete"; \
	else \
		echo "❌ Cleanup cancelled"; \
	fi

# Build Docker images
build:
	@echo "Building Docker images..."
	@docker-compose build

# Initial setup
setup:
	@echo "Running initial setup..."
	@if [ ! -f .env ]; then cp .env.example .env; fi
	@docker-compose up -d
	@docker-compose --profile setup up model-setup

# Download/update models
models:
	@echo "Downloading/updating AI models..."
	@docker-compose --profile setup up model-setup

# Check service status
status:
	@echo "Service Status:"
	@echo "==============="
	@docker-compose ps
	@echo ""
	@echo "Resource Usage:"
	@echo "==============="
	@docker stats --no-stream sweek-ai-ollama sweek-ai-webui sweek-ai-postgres sweek-ai-redis sweek-ai-nginx 2>/dev/null || true

# Backup data
backup:
	@echo "Creating backup..."
	@mkdir -p backups
	@BACKUP_NAME="backup-$$(date +%Y%m%d-%H%M%S)"; \
	docker-compose exec -T postgres pg_dump -U sweekuser sweekdb > "backups/$$BACKUP_NAME.sql" 2>/dev/null || true; \
	tar -czf "backups/$$BACKUP_NAME.tar.gz" open-webui-data/ .env custom/ 2>/dev/null || true; \
	echo "✅ Backup created: backups/$$BACKUP_NAME.tar.gz"

# Restore from backup
restore:
	@echo "Available backups:"
	@ls -la backups/*.tar.gz 2>/dev/null || echo "No backups found"
	@read -p "Enter backup filename (without path): " BACKUP_FILE; \
	if [ -f "backups/$$BACKUP_FILE" ]; then \
		tar -xzf "backups/$$BACKUP_FILE"; \
		echo "✅ Backup restored from $$BACKUP_FILE"; \
		echo "Run 'make restart' to apply changes"; \
	else \
		echo "❌ Backup file not found"; \
	fi

# Development commands
dev:
	@docker-compose up

dev-logs:
	@docker-compose logs -f open-webui ollama

# Shell access to containers
shell-webui:
	@docker-compose exec open-webui /bin/bash

shell-ollama:
	@docker-compose exec ollama /bin/bash

shell-postgres:
	@docker-compose exec postgres psql -U sweekuser sweekdb

# Health check
health:
	@echo "Checking service health..."
	@curl -s http://localhost/health > /dev/null && echo "✅ Nginx: Healthy" || echo "❌ Nginx: Unhealthy"
	@curl -s http://localhost:3000 > /dev/null && echo "✅ WebUI: Healthy" || echo "❌ WebUI: Unhealthy"
	@curl -s http://localhost:11434/api/version > /dev/null && echo "✅ Ollama: Healthy" || echo "❌ Ollama: Unhealthy"

# Quick install for new users
install: setup start
	@echo "Installation complete! Visit http://localhost:3000"