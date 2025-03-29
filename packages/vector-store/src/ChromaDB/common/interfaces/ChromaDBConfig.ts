import type { VectorStoreConfig } from '../../../common/interfaces';

/**
 * Configuration options for ChromaDB
 */
export interface ChromaDBConfig extends VectorStoreConfig {
	/**
	 * URL to the ChromaDB server
	 * @default 'http://localhost:8000'
	 */
	url?: string;

	/**
	 * Embedding function to use
	 * If not provided, will use the default embedding function from ChromaDB
	 */
	embeddingFunction?: any;

	/**
	 * The dimension of the embedding vectors
	 * @default 1536
	 */
	embeddingDimension?: number;
}
