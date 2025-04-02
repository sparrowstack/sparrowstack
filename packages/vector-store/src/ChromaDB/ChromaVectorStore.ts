import { Default, Space } from '@chromadb/common/enums';
import type { Record } from '@chromadb/common/interfaces';
import { ChromaClient, OpenAIEmbeddingFunction } from 'chromadb';
import type { SearchResult } from '@vector-store/common/interfaces';
import type { ChromaDBConfig } from '@chromadb/common/interfaces/ChromaDBConfig';
import { formatRecordsForChroma } from '@chromadb/common/utils/formatRecordsForChroma';

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
		this.embeddingFunction =
			embeddingFunction ||
			new OpenAIEmbeddingFunction({
				openai_api_key: process.env.OPENAI_API_KEY as string,
				openai_model: 'text-embedding-3-small',
			});
	}

	async heartbeat() {
		return await this.client.heartbeat();
	}

	async createCollection({
		hnswSpace,
		collectionName,
	}: {
		hnswSpace?: Space;
		collectionName: string;
	}) {
		return await this.client.createCollection({
			name: collectionName,
			embeddingFunction: this.embeddingFunction,
			metadata: {
				'hnsw:space': hnswSpace || Space.Cosine,
			},
		});
	}

	async getCollection({ collectionName }: { collectionName: string }) {
		return await this.client.getCollection({
			name: collectionName,
			embeddingFunction: this.embeddingFunction,
		});
	}

	async listCollections() {
		return await this.client.listCollections();
	}

	async getOrCreateCollection({
		hnswSpace,
		collectionName,
	}: {
		hnswSpace?: Space;
		collectionName: string;
	}) {
		return await this.client.getOrCreateCollection({
			name: collectionName,
			embeddingFunction: this.embeddingFunction,
			metadata: {
				'hnsw:space': hnswSpace || Space.Cosine,
			},
		});
	}

	async add({
		records,
		collectionName,
	}: {
		records: Record[];
		collectionName: string;
	}) {
		const formattedRecords = await formatRecordsForChroma({
			records,
			embeddingFunction: this.embeddingFunction,
		});
		const collection = await this.getOrCreateCollection({ collectionName });

		return await collection.add(formattedRecords);
	}

	async query({
		limit,
		query,
		collectionName,
	}: {
		limit: number;
		query: string[];
		collectionName: string;
	}): Promise<SearchResult[]> {
		let searchResults: SearchResult[] = [];
		const collection = await this.getCollection({ collectionName });
		const queryResults = await collection.query({
			nResults: limit,
			queryTexts: query,
		});
		const documents = queryResults.documents?.[0] || [];

		if (documents.length !== 0) {
			searchResults = documents.map(
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
		}

		return searchResults;
	}

	async deleteCollection({ collectionName }: { collectionName: string }) {
		return await this.client.deleteCollection({
			name: collectionName,
		});
	}

	async reset() {
		return await this.client.reset();
	}
}
