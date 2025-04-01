/**
 * Represents a document to be stored in the vector store
 */
export interface Document {
	/** Unique identifier for the document */
	id: string;
	/** The actual text content of the document */
	text: string;
	/** Optional metadata associated with the document */
	metadata?: Record<string, any>;
}
