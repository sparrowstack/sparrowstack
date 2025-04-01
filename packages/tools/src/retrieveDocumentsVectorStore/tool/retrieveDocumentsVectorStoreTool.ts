import { Tool } from '@sparrowstack/tool';
import { retrieveDocumentsVectorStoreToolParams } from '@tools/retrieveDocumentsVectorStore/tool/retrieveDocumentsVectorStoreToolParams';

export const retrieveDocumentsVectorStoreTool = new Tool(
	retrieveDocumentsVectorStoreToolParams,
);
