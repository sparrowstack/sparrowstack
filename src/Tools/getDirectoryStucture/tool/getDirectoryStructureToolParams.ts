import { type IToolParams } from '@Tool';
import { getDirectoryStructure as getDirectoryStructureMethod } from '@Tools/getDirectoryStucture/function/getDirectoryStructure';
import type { IGetDirectoryStructureParams } from '@Tools/getDirectoryStucture/function/common/interfaces/IGetDirectoryStructureParams';

export const getDirectoryStructureToolParams: IToolParams = {
	name: 'getDirectoryStructure',

	description:
		'Get the directory structure of the current working project. Only use when analyzing code structure, debugging path issues, or when specifically requested by the user. Do not use for general conversation or greetings.',
	function: async () => {
		const getDirectoryStructureParams: IGetDirectoryStructureParams = {
			directoryPath: process.cwd(),
		};
		const directoryStructure = getDirectoryStructureMethod(
			getDirectoryStructureParams,
		);

		return JSON.stringify(directoryStructure);
	},
	maxCallCount: 1,
	maxCallCountExceededResponse: 'Max call count exceeded',
};
