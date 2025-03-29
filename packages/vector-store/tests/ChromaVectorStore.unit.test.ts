import { describe, expect, test, beforeEach, mock } from 'bun:test';
import { ChromaVectorStore } from '../src/ChromaDB/ChromaVectorStore';
import type { Document } from '../src/common/interfaces';

// Mock ChromaDB client
const mockCollection = {
	add: mock(() => Promise.resolve()),
	query: mock(() => {
		Promise.resolve({
			ids: [['1', '2']],
			distances: [[0.1, 0.2]],
			documents: [['Test document 1', 'Test document 2']],
			metadatas: [[{ source: 'test' }, { source: 'test2' }]],
		});
	}),
};

const mockChromaClient = {
	getCollection: mock(() => Promise.resolve(mockCollection)),
	createCollection: mock(() => Promise.resolve(mockCollection)),
	deleteCollection: mock(() => Promise.resolve()),
	listCollections: mock(() => Promise.resolve(['test-collection'])),
};

// Mock the ChromaDB module
mock.module('chromadb', () => {
	return {
		ChromaClient: function () {
			return mockChromaClient;
		},
	};
});

describe('ChromaVectorStore', () => {
	let vectorStore: ChromaVectorStore;

	beforeEach(() => {
		vectorStore = new ChromaVectorStore({
			collectionName: 'test-collection',
		});

		// Reset mock calls
		mockChromaClient.getCollection.mockClear();
		mockChromaClient.createCollection.mockClear();
		mockChromaClient.deleteCollection.mockClear();
		mockChromaClient.listCollections.mockClear();
		mockCollection.add.mockClear();
		mockCollection.query.mockClear();
	});

	test('should check if collection exists', async () => {
		// Arrange
		mockChromaClient.listCollections.mockImplementationOnce(() =>
			Promise.resolve(['test-collection', 'other-collection']),
		);

		// Act
		const exists = await vectorStore.collectionExists();

		// Assert
		expect(exists).toBe(true);
		expect(mockChromaClient.listCollections).toHaveBeenCalled();
	});

	test('should return false if collection does not exist', async () => {
		// Arrange
		mockChromaClient.listCollections.mockImplementationOnce(() =>
			Promise.resolve(['other-collection']),
		);

		// Act
		const exists = await vectorStore.collectionExists();

		// Assert
		expect(exists).toBe(false);
		expect(mockChromaClient.listCollections).toHaveBeenCalled();
	});

	test('should add documents to the collection', async () => {
		// Arrange
		const documents: Document[] = [
			{ id: '1', text: 'Document 1', metadata: { source: 'test' } },
			{ id: '2', text: 'Document 2', metadata: { source: 'test2' } },
		];

		// Act
		await vectorStore.addDocuments(documents);

		// Assert
		expect(mockCollection.add).toHaveBeenCalledWith({
			ids: ['1', '2'],
			documents: ['Document 1', 'Document 2'],
			metadatas: [{ source: 'test' }, { source: 'test2' }],
		});
	});

	test('should search for documents', async () => {
		// Act
		const results = await vectorStore.search('test query');

		// Assert
		expect(mockCollection.query).toHaveBeenCalledWith({
			queryTexts: ['test query'],
			nResults: 10,
		});

		expect(results).toHaveLength(2);
		expect(results[0].document.id).toBe('1');
		expect(results[0].document.text).toBe('Test document 1');
		expect(results[0].score).toBeCloseTo(0.9); // 1 - distance
	});

	test('should delete collection', async () => {
		// Act
		await vectorStore.deleteCollection();

		// Assert
		expect(mockChromaClient.deleteCollection).toHaveBeenCalledWith({
			name: 'test-collection',
		});
	});
});
