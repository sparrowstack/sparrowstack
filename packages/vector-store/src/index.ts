// Always use relative paths for exports in entry point index.ts

/**
 * @sparrowstack/vector-store
 * Vector store implementations for SparrowStack
 */

// Common interfaces
export type { VectorStore } from './common/interfaces/VectorStore';
export type { Document } from './common/interfaces/Document';
export type { SearchResult } from './common/interfaces/SearchResult';
export type { VectorStoreConfig } from './common/interfaces/VectorStoreConfig';

// ChromaDB implementation
export { ChromaVectorStore } from './ChromaDB/ChromaVectorStore';
