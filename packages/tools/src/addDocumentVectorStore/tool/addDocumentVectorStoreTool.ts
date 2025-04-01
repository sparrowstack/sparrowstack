import { Tool } from '@sparrowstack/tool';
import { addDocumentVectorStoreToolParams } from '@tools/addDocumentVectorStore/tool/addDocumentVectorStoreToolParams';

export const addDocumentVectorStoreTool = new Tool(
	addDocumentVectorStoreToolParams,
);
