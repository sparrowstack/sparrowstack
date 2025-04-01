import type { Document } from './Document';

/**
 * Result returned from a vector store search
 */
export interface SearchResult {
	/** The document that matched the search query */
	document: Document;
	/** The similarity score between the query and this document */
	score: number;
}
