import { type IToolParams, type IRuntimeParams } from '@sparrowstack/tool';
import { maxCallCountExceededMessage } from '@tools/getDirectoryStructure/maxCallCountExceededMessage';
import { getDirectoryStructure as getDirectoryStructureMethod } from '@tools/getDirectoryStructure/function/getDirectoryStructure';
import type { IGetDirectoryStructureParams } from '@tools/getDirectoryStructure/function/common/interfaces/IGetDirectoryStructureParams';

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
	validate: async () => {
		return true;
	},
	// validationFailedMessage: `VAIDATION FAILED - User cannot call this tool`,
	maxCallCount: 1,
	// maxCallCountExceededMessage: `
	// TOOL_CALL_MAX_CALL_COUNT_EXCEEDED:
	// The user has exceeded the rate limit for the 'getDirectoryStructure' tool (only 1 tool call allowed).
	// Please use the 'getDirectoryStructure' result you provided in an earlier message.
	// `,
	maxCallCountExceededMessage: async (runtimeParams: IRuntimeParams) => {
		return await maxCallCountExceededMessage(runtimeParams);
	},
};
