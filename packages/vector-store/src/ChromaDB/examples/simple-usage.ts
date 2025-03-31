import { OpenAIEmbeddingFunction } from 'chromadb';
import { formatRecordsForChroma } from '@chromadb/common/utils/formatRecordsForChroma';
import { ChromaVectorStore } from '@chromadb/ChromaVectorStore';


const chromaVectorStore = new ChromaVectorStore({
	dbUrl: 'http://localhost:8000',
	embeddingDimension: 1536,
	embeddingFunction: openAIEmbeddingFunction,
});

await chromaVectorStore.getOrCreateCollection({
	collectionName: 'test-collection',
	metadata: {},
});

chromaVectorStore.add({
	collectionName: 'test-collection',
	records: formattedRecords,
});

const results = await chromaVectorStore.query({
	collectionName: 'test-collection',
	queryTexts: ['pineapple'],
	nResults: 10,
});

console.log(results);
