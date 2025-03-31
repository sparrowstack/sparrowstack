import 'dotenv/config';
import { OpenAIEmbeddingFunction } from 'chromadb';
import { Default, Space } from '@chromadb/common/enums';
import { ChromaClient, type AddRecordsParams } from 'chromadb';
import type { ChromaDBConfig } from '@chromadb/common/interfaces/ChromaDBConfig';

export class ChromaVectorStore {
	private client: ChromaClient;
	private embeddingDimension: number;
	private embeddingFunction: OpenAIEmbeddingFunction;

	constructor({
		dbUrl,
		embeddingFunction,
		embeddingDimension,
	}: ChromaDBConfig = {}) {
		// Create ChromaDB client
		const client = new ChromaClient({
			path: dbUrl || (Default.Url as string),
		});

		this.client = client;
		this.embeddingDimension =
			embeddingDimension || Default.EmbeddingDimension;
		this.embeddingFunction = embeddingFunction;
	}

	async heartbeat() {
		return await this.client.heartbeat();
	}

	async listCollections() {
		return await this.client.listCollections();
	}

	async deleteCollection({ collectionName }: { collectionName: string }) {
		return await this.client.deleteCollection({
			name: collectionName,
		});
	}

	async reset() {
		return await this.client.reset();
	}

	async getCollection({ collectionName }: { collectionName: string }) {
		return await this.client.getCollection({
			name: collectionName,
			embeddingFunction: this.embeddingFunction,
		});
	}

	async createCollection({
		metadata,
		collectionName,
	}: {
		collectionName: string;
		metadata: Record<string, any>;
	}) {
		return await this.client.createCollection({
			name: collectionName,
			embeddingFunction: this.embeddingFunction,
			metadata: {
				'hnsw:space': metadata['hnsw:space'] || Space.Cosine,
			},
		});
	}

	async getOrCreateCollection({
		metadata,
		collectionName,
	}: {
		collectionName: string;
		metadata: Record<string, any>;
	}) {
		return await this.client.getOrCreateCollection({
			name: collectionName,
			embeddingFunction: this.embeddingFunction,
			metadata: {
				'hnsw:space': metadata['hnsw:space'] || Space.Cosine,
			},
		});
	}

	// Collection methods
	// ---------------------------
	// async modify({ collectionName }: { collectionName: string }) {
	// 	const collection = this.getCollection({ collectionName });

	// 	return await collection.modify({
	// 		name: collectionName,
	// 	});
	// }

	async add({
		records,
		collectionName,
	}: {
		collectionName: string;
		records: AddRecordsParams;
	}) {
		const collection = await this.getCollection({ collectionName });

		return await collection.add(records);
	}

	async query({
		nResults,
		queryTexts,
		collectionName,
	}: {
		collectionName: string;
		queryTexts: string[];
		nResults: number;
	}) {
		const collection = await this.getCollection({ collectionName });

		const queryResults = await collection.query({
			nResults,
			queryTexts,
		});

		const documents = queryResults.documents?.[0] || [];

		if (!documents || documents.length === 0) {
			console.log('No results found');
		} else {
			const searchResults = documents.map(
				(text: string | null, index: number) => {
					const id = queryResults.ids?.[0]?.[index] || '';
					const metadata = queryResults.metadatas?.[0]?.[index] || {};
					const distance = queryResults.distances?.[0]?.[index] || 0;

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
				},
			);

			return searchResults;
		}
	}
}
