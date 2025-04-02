import { retrieveDocumentsVectorStore } from '@tools/retrieveDocumentsVectorStore/function/retrieveDocumentsVectorStore';

const result = await retrieveDocumentsVectorStore({
	query: 'What is the latest on tariffs?',
});

console.log(result);
