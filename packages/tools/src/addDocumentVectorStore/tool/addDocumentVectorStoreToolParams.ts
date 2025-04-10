import { PropertyType, type ToolParams } from '@sparrowstack/tool';
import { addDocumentVectorStore } from '@tools/addDocumentVectorStore/function/addDocumentVectorStore';

export const addDocumentVectorStoreToolParams: ToolParams = {
	name: 'addDocumentVectorStore',

	description: 'Add the text documentto the vector database.',

	function: async ({ text }: { text: string }) => {
		const result = addDocumentVectorStore({ text });

		return result;
	},

	parameters: {
		text: {
			required: true,
			type: PropertyType.String,
			description: 'The text document to add to the vector database.',
		},
	},
};
