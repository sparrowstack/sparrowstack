import { ChromaClient, Collection } from 'chromadb';
import type { ChromaDBConfig } from './common/interfaces';
import type { Document, SearchResult, VectorStore } from '../common/interfaces';

/**
 * ChromaDB implementation of VectorStore
 */
export class ChromaVectorStore implements VectorStore {
	private client: ChromaClient;
	private collection: Collection | null = null;
	private readonly config: ChromaDBConfig;

	/**
	 * Creates a new ChromaVectorStore
	 * @param config Configuration options for the ChromaDB store
	 */
	constructor(config: ChromaDBConfig) {
		this.config = {
			url: 'http://localhost:8000',
			embeddingDimension: 1536,
			...config,
		};

		// Create the ChromaDB client with the updated API
		this.client = new ChromaClient({
			path: this.config.url,
		});
	}

	/**
	 * Initialize the ChromaDB collection
	 * @private
	 */
	private async initializeCollection(): Promise<Collection> {
		if (this.collection) {
			return this.collection;
		}

		const exists = await this.collectionExists();

		if (exists) {
			this.collection = await this.client.getCollection({
				name: this.config.collectionName,
				...(this.config.embeddingFunction && {
					embeddingFunction: this.config.embeddingFunction,
				}),
			});
		} else {
			this.collection = await this.client.createCollection({
				name: this.config.collectionName,
				...(this.config.embeddingFunction && {
					embeddingFunction: this.config.embeddingFunction,
				}),
			});
		}

		return this.collection;
	}

	/**
	 * Check if the collection exists
	 */
	async collectionExists(): Promise<boolean> {
		try {
			const collections = await this.client.listCollections();
			return collections.some(
				(collection) => collection === this.config.collectionName,
			);
		} catch (error) {
			console.error('Error checking collection existence:', error);
			return false;
		}
	}

	/**
	 * Add documents to the vector store
	 * @param documents Array of documents to add
	 */
	async addDocuments(documents: Document[]): Promise<void> {
		try {
			const collection = await this.initializeCollection();

			// Prepare documents for ChromaDB format
			const ids = documents.map((doc) => doc.id);
			const texts = documents.map((doc) => doc.text);
			const metadatas = documents.map((doc) => doc.metadata || {});

			await collection.add({
				ids,
				documents: texts,
				metadatas,
			});
		} catch (error) {
			console.error('Error adding documents:', error);
			throw error;
		}
	}

	/**
	 * Search for documents similar to the query
	 * @param query The search query
	 * @param limit Maximum number of results to return (default: 10)
	 */
	async search(query: string, limit = 10): Promise<SearchResult[]> {
		try {
			const collection = await this.initializeCollection();

			const results = await collection.query({
				queryTexts: [query],
				nResults: limit,
			});

			if (!results.documents || !results.documents[0]) {
				return [];
			}

			// Convert ChromaDB results to SearchResults
			return (results.documents[0] || []).map((text, index) => {
				const id = results.ids?.[0]?.[index] || '';
				const metadata = results.metadatas?.[0]?.[index] || {};
				const distance = results.distances?.[0]?.[index] || 0;

				// Convert distance to similarity score (1 - distance)
				const score = 1 - distance;

				return {
					document: {
						id,
						text: text || '',
						metadata,
					},
					score,
				};
			});
		} catch (error) {
			console.error('Error searching documents:', error);
			return [];
		}
	}

	/**
	 * Delete the entire collection
	 */
	async deleteCollection(): Promise<void> {
		try {
			if (await this.collectionExists()) {
				await this.client.deleteCollection({
					name: this.config.collectionName,
				});
				this.collection = null;
			}
		} catch (error) {
			console.error('Error deleting collection:', error);
			throw error;
		}
	}
}
