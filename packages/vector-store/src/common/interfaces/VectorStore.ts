import type { Document } from './Document';
import type { SearchResult } from './SearchResult';

/**
 * Generic interface for all vector stores
 */
export interface VectorStore {
	/**
	 * Add documents to the vector store
	 * @param documents Array of documents to add
	 */
	addDocuments(documents: Document[]): Promise<void>;

	/**
	 * Search for documents similar to the query
	 * @param query The search query
	 * @param limit Maximum number of results to return
	 */
	search(query: string, limit?: number): Promise<SearchResult[]>;

	/**
	 * Delete the entire collection
	 */
	deleteCollection(): Promise<void>;

	/**
	 * Check if the collection exists
	 */
	collectionExists(): Promise<boolean>;
}
