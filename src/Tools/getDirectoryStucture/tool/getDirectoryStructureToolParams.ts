import type { IToolParams } from '@Tool';
import { getDirectoryStructure as getDirectoryStructureMethod } from '@Tools/getDirectoryStucture/method/getDirectoryStructure';

export const getDirectoryStructureToolParams: IToolParams = {
	name: 'getDirectoryStructure',
	
	description:
	'Get the directory structure of the current working project. Only use when analyzing code structure, debugging path issues, or when specifically requested by the user. Do not use for general conversation or greetings. Do not call this tool more than once in a single conversation.',
	function: async () => {
		const directoryPath = process.cwd();
		const directoryStructure = getDirectoryStructureMethod({
			directoryPath,
		});
		
		return JSON.stringify(directoryStructure);
	},
	// TODO:
	// validate
	// cachedResults
	// lastCachedResult
	// callCount
};
