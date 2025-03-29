#!/bin/bash

# Script to manage ChromaDB Docker containers
# Usage: ./chromadb.sh [start|stop|status|logs]

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PARENT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PARENT_DIR" || exit 1

case "$1" in
  start)
    echo "Starting ChromaDB containers..."
    docker-compose up -d
    echo "ChromaDB is now running at http://localhost:8000"
    echo "To check logs: ./scripts/chromadb.sh logs"
    ;;
  stop)
    echo "Stopping ChromaDB containers..."
    docker-compose down
    ;;
  status)
    echo "ChromaDB container status:"
    docker-compose ps
    ;;
  logs)
    if [ -z "$2" ]; then
      echo "Showing logs for ChromaDB..."
      docker-compose logs -f chromadb
    else
      echo "Showing logs for $2..."
      docker-compose logs -f "$2"
    fi
    ;;
  *)
    echo "Usage: $0 [start|stop|status|logs]"
    echo "  start  - Start ChromaDB Docker containers"
    echo "  stop   - Stop ChromaDB Docker containers"
    echo "  status - Show status of containers"
    echo "  logs   - Show logs (default: chromadb container)"
    echo "           Use 'logs clickhouse' to see ClickHouse logs"
    exit 1
    ;;
esac 