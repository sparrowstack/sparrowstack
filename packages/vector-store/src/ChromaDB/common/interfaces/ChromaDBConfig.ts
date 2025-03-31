export interface ChromaDBConfig {
	/**
	 * URL to the ChromaDB server
	 * @default Config.DefaultUrl
	 */
	dbUrl?: string;

	/**
	 * The dimension of the embedding vectors
	 * @default Config.DefaultEmbeddingDimension
	 */
	embeddingDimension?: number;

	/**
	 * Embedding function to use
	 * If not provided, will use the default embedding function from ChromaDB
	 */
	embeddingFunction?: any;
}
