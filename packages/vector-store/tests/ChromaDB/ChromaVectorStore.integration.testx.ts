import { Space } from '@chromadb/common/enums';
import { ChromaVectorStore } from '@chromadb/ChromaVectorStore';
import type { SearchResult } from '@vector-store/common/interfaces';
import { describe, expect, test, beforeEach, afterEach } from 'bun:test';
import { Collection, IncludeEnum, OpenAIEmbeddingFunction } from 'chromadb';

describe('ChromaVectorStore', () => {
	const record1 = {
		id: 'id1',
		document: 'This is a document about pineapple',
		metadata: {
			source: 'pineapple',
		},
	};
	const record2 = {
		id: 'id2',
		document: 'This is a document about oranges',
		metadata: {
			source: 'orange',
		},
	};
	let chromaVectorStore: ChromaVectorStore;
	let openAIEmbeddingFunction: OpenAIEmbeddingFunction;

	beforeEach(async () => {
		openAIEmbeddingFunction = new OpenAIEmbeddingFunction({
			openai_api_key: process.env.OPENAI_API_KEY as string,
			openai_model: 'text-embedding-3-small',
		});

		chromaVectorStore = new ChromaVectorStore({
			dbUrl: 'http://localhost:8000',
			embeddingDimension: 1536,
			embeddingFunction: openAIEmbeddingFunction,
		});
	});

	afterEach(async () => {
		await chromaVectorStore.reset();
	});

	describe('constructor', () => {
		test('should create a new ChromaVectorStore instance', () => {
			expect(chromaVectorStore).toBeInstanceOf(ChromaVectorStore);
		});
	});

	describe('heartbeat', () => {
		let heartbeat: number;

		beforeEach(async () => {
			heartbeat = await chromaVectorStore.heartbeat();
		});

		test('should be a number', async () => {
			expect(heartbeat).toEqual(expect.any(Number));
		});
	});

	describe('createCollection', () => {
		const collectionName = 'test';
		let collection: Collection;

		beforeEach(async () => {
			collection = await chromaVectorStore.createCollection({
				collectionName,
				hnswSpace: Space.SquaredL2,
			});
		});

		test('should create a new collection', async () => {
			expect(collection).toBeInstanceOf(Collection);
			expect(collection.name).toBe(collectionName);
			expect(collection.metadata).toStrictEqual({
				'hnsw:space': Space.SquaredL2,
			});
		});
	});

	describe('getCollection', () => {
		const collectionName = 'test';
		let collection: Collection;

		beforeEach(async () => {
			await chromaVectorStore.createCollection({
				collectionName,
				hnswSpace: Space.SquaredL2,
			});

			collection = await chromaVectorStore.getCollection({
				collectionName,
			});
		});

		test('should get expected collection', async () => {
			expect(collection).toBeInstanceOf(Collection);
			expect(collection.name).toBe(collectionName);
			expect(collection.metadata).toStrictEqual({
				'hnsw:space': Space.SquaredL2,
			});
		});
	});

	describe('listCollections', () => {
		const collectionName1 = 'test1';
		const collectionName2 = 'test2';
		let collections: string[];
		let collection1: string;
		let collection2: string;

		beforeEach(async () => {
			await chromaVectorStore.createCollection({
				collectionName: collectionName1,
			});

			await chromaVectorStore.createCollection({
				collectionName: collectionName2,
			});

			collections = await chromaVectorStore.listCollections();

			collection1 = collections.find(
				(collectionName) => collectionName === collectionName1,
			) as string;

			collection2 = collections.find(
				(collectionName) => collectionName === collectionName2,
			) as string;
		});

		test('should return expecetd collections', async () => {
			expect(collection1).toBe(collectionName1);
			expect(collection2).toBe(collectionName2);
		});
	});

	describe('add', () => {
		const collectionName = 'testAdd';
		let collection: Collection;
		// Note: MultiGetResponse is not exported from chromadb :/
		let records: any;

		beforeEach(async () => {
			chromaVectorStore = new ChromaVectorStore({
				dbUrl: 'http://localhost:8000',
				embeddingDimension: 1536,
				embeddingFunction: openAIEmbeddingFunction,
			});

			await chromaVectorStore.createCollection({
				collectionName,
			});

			await chromaVectorStore.add({
				collectionName,
				records: [record1, record2],
			});

			collection = await chromaVectorStore.getCollection({
				collectionName,
			});

			records = await collection.peek();
		});

		test('should add records to the vector store', async () => {
			expect(records).toStrictEqual({
				ids: [record1.id, record2.id],
				embeddings: null,
				documents: [record1.document, record2.document],
				metadatas: [record1.metadata, record2.metadata],
				included: [IncludeEnum.Documents, IncludeEnum.Metadatas],
				uris: null,
				data: null,
			});
		});
	});

	describe('query', () => {
		const collectionName = 'testAdd';
		let results: SearchResult[];

		beforeEach(async () => {
			chromaVectorStore = new ChromaVectorStore({
				dbUrl: 'http://localhost:8000',
				embeddingDimension: 1536,
				embeddingFunction: openAIEmbeddingFunction,
			});

			await chromaVectorStore.createCollection({
				collectionName,
			});

			await chromaVectorStore.add({
				collectionName,
				records: [record1, record2],
			});

			results = await chromaVectorStore.query({
				collectionName,
				query: ['This is a query document about hawaii'],
				limit: 1,
			});
		});

		test('should query expected records from the vector store', async () => {
			expect(results).toStrictEqual([
				{
					document: {
						id: record1.id,
						metadata: record1.metadata,
						text: record1.document,
					},
					score: expect.any(Number),
				},
			]);
		});
	});
});
