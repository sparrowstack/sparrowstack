import { PropertyType, type ToolParams } from '@sparrowstack/tool';
import { retrieveDocumentsVectorStore } from '@tools/retrieveDocumentsVectorStore/function/retrieveDocumentsVectorStore';

export const retrieveDocumentsVectorStoreToolParams: ToolParams = {
	name: 'retrieveDocumentsVectorStore',

	description: `Retrieve text documents from the vector database. 
Your task is use the data returned data to answer the user's question.`,

	function: async ({ query }: { query: string }) => {
		const result = retrieveDocumentsVectorStore({ query });

		return result;
	},

	parameters: {
		query: {
			required: true,
			type: PropertyType.String,
			description:
				'The query to retrieve documents from the vector database.',
		},
	},
};
