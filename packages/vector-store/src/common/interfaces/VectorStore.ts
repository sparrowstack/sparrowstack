import type { Document } from '@vector-store/common/interfaces/Document';
import type { SearchResult } from '@vector-store/common/interfaces/SearchResult';

/**
 * Generic interface for all vector stores
 */
export interface VectorStore {
	/**
	 * Add documents to the vector store
	 * @param documents Array of documents to add
	 */
	addDocuments({
		documents,
	}: {
		documents: Document[];
		ids?: string[];
	}): Promise<void>;

	/**
	 * Search for documents similar to the query
	 * @param query The search query
	 * @param limit Maximum number of results to return
	 */
	search({
		query,
		limit,
	}: {
		query: string;
		limit?: number;
	}): Promise<SearchResult[]>;

	/**
	 * Delete the entire collection
	 */
	deleteCollection(): Promise<void>;

	/**
	 * Check if the collection exists
	 */
	collectionExists(): Promise<boolean>;
}
