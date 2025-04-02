import { v4 as uuidv4 } from 'uuid';
import { ChromaVectorStore } from '@sparrowstack/vector-store';

interface Params {
	text: string;
}

export const addDocumentVectorStore = ({ text }: Params) => {
	const vectorStore = new ChromaVectorStore();
	vectorStore.add({
		records: [
			{
				id: uuidv4(),
				document: text,
			},
		],
		collectionName: 'test',
	});

	return `Document added to 'test' collection`;
};
