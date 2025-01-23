import type { IToolSchema } from '@Agent/core/Tools/common/interfaces';
import { getDirectoryStructure as getDirectoryStructureMethod } from '@Agent/core/Tools/getDirectoryStucture/getDirectoryStructure';

const name = 'get_directory_structure';

export const getDirectoryStructure: IToolSchema = {
	provider: 'anthropic',
	tool: {
		name,
		// TODO: Could even have a smart generator for this
		description:
			'Get the directory structure of the current working project. Only use when analyzing code structure, debugging path issues, or when specifically requested by the user. Do not use for general conversation or greetings. Do not call this tool more than once in a single conversation.',
		input_schema: {
			type: 'object',
			properties: {
				directoryStructure: {
					type: 'string',
					description:
						'The directory structure of the current working project.',
				},
			},
		},
	},
	toolCall: {
		name,
		// maxCalls: number
		// similies: []
		// validation: () => {};
		// count: () => {};
		method: () => {
			const directoryPath = process.cwd();
			const directoryStructure = getDirectoryStructureMethod({
				directoryPath,
			});

			return JSON.stringify(directoryStructure);
		},
	},
};
