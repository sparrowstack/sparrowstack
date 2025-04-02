import { addDocumentVectorStore } from '@tools/addDocumentVectorStore/function/addDocumentVectorStore';

const result = addDocumentVectorStore({
	text: 'Hello, world!',
});

console.log(result);
