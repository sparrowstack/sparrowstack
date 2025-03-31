import { OpenAIEmbeddingFunction } from 'chromadb';
import { describe, expect, test, beforeEach } from 'bun:test';
import { ChromaVectorStore } from '@chromadb/ChromaVectorStore';
import { formatRecordsForChroma } from '@chromadb/common/utils/formatRecordsForChroma';

describe('ChromaVectorStore', () => {
	let chromaVectorStore: ChromaVectorStore;

	beforeEach(async () => {
		const openAIEmbeddingFunction = new OpenAIEmbeddingFunction({
			openai_api_key: process.env.OPENAI_API_KEY as string,
			openai_model: 'text-embedding-3-small',
		});

		const record1 = {
			id: 'id1',
			document: 'This is a document about pineapple',
			embeddings: [],
		};

		const record2 = {
			id: 'id2',
			document: 'This is a document about oranges',
		};

		const formattedRecords = formatRecordsForChroma({
			records: [record1, record2],
		});

		const embeddings = await openAIEmbeddingFunction.generate(
			formattedRecords.documents,
		);

		formattedRecords.embeddings = embeddings;

		chromaVectorStore = new ChromaVectorStore({
			dbUrl: 'http://localhost:8000',
			embeddingDimension: 1536,
			embeddingFunction: openAIEmbeddingFunction,
		});
	});

	describe('constructor', () => {
		test('should create a new ChromaVectorStore instance', () => {
			expect(chromaVectorStore).toBeInstanceOf(ChromaVectorStore);
		});
	});
});
