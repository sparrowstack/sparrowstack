# @sparrowstack/vector-store

Vector store implementation for SparrowStack with ChromaDB support.

## Installation

```bash
bun add @sparrowstack/vector-store
```

## Usage

```typescript
import { ChromaVectorStore } from '@sparrowstack/vector-store';

// Create a new ChromaDB vector store
const vectorStore = new ChromaVectorStore({
	config: {
		collectionName: 'my-documents',
		url: 'http://localhost:8000', // Default URL for local Docker setup
	},
});

// Add documents to the store
await vectorStore.addDocuments([
	{
		id: '1',
		text: 'This is a sample document',
		metadata: { source: 'user-input' },
	},
	{
		id: '2',
		text: 'Another document for testing',
		metadata: { source: 'documentation' },
	},
]);

// Search for similar documents
const results = await vectorStore.search({
	query: 'sample document',
	limit: 5,
});
console.log(results);
```

## Local Development with Docker

A Docker Compose configuration is provided to run ChromaDB locally with persistent storage.

To start the ChromaDB server:

```bash
cd packages/vector-store
docker-compose up -d
```

This will start ChromaDB on port 8000 with ClickHouse as the persistence layer. Data will be stored in Docker volumes for persistence across restarts.

To stop the servers:

```bash
docker-compose down
```

## Configuration

The `ChromaVectorStore` constructor accepts the following configuration options:

- `collectionName` (required): Name of the collection to store vectors
- `url` (optional): URL to the ChromaDB server (default: 'http://localhost:8000')
- `embeddingFunction` (optional): Custom embedding function to use
- `embeddingDimension` (optional): Dimension of the embedding vectors (default: 1536)

## License

This package is part of SparrowStack and is subject to the same license as the main project.
