import { ChromaVectorStore } from '@sparrowstack/vector-store';

interface Params {
	query: string;
}

export const retrieveDocumentsVectorStore = async ({ query }: Params) => {
	const vectorStore = new ChromaVectorStore();
	const result = await vectorStore.query({
		limit: 10,
		query: [query],
		collectionName: 'test',
	});

	const documents = result.map((result) => result.document.text);

	return JSON.stringify(documents);
};
