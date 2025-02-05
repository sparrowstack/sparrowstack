import type { IRuntimeParams } from '@tool';
import type { IDirectoryNode } from '@tools/getDirectoryStucture/function/common/interfaces/IDirectoryNode';

export const maxCallCountExceededMessage = async (
	runtimeParams: IRuntimeParams,
): Promise<string> => {
	const { lastCachedResult } = runtimeParams;
	const result = lastCachedResult?.result as IDirectoryNode;

	// Note: return the result object as a string
	// When I JSON.stringify the result, I get 'overload' errors from the LLM.
	return `
	Max call count exceeded: This user is only allowed to make 1 'getDirectoryStructure' call.

	Please see results from the last 'getDirectoryStructure' request:
	${result}
	`;

	// return JSON.stringify(result);
};
