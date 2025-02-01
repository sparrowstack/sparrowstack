import type { IToolParams } from '@Tool';
import type { IValidateParams } from '@Tool/common/interfaces';
import { getDirectoryStructure as getDirectoryStructureMethod } from '@Tools/getDirectoryStucture/function/getDirectoryStructure';

export const getDirectoryStructureToolParams: IToolParams = {
	name: 'getDirectoryStructure',

	description:
		// Add back later: Do not call this tool more than once in a single conversation.
		'Get the directory structure of the current working project. Only use when analyzing code structure, debugging path issues, or when specifically requested by the user. Do not use for general conversation or greetings.',
	function: async () => {
		const directoryPath = process.cwd();
		const directoryStructure = getDirectoryStructureMethod({
			directoryPath,
		});

		return JSON.stringify(directoryStructure);
	},
	validate: async ({ callCount, context }: IValidateParams) => {
		let addToolToPrompt = true;
		console.log('[Validate] callCount', callCount);
		console.log('[Validate] context', context);

		if (callCount > 0) {
			addToolToPrompt = false;
		}

		console.log('[Validate] addToolToPrompt', addToolToPrompt);

		return addToolToPrompt;
	},
};
