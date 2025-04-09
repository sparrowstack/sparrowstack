import type { RuntimeParams } from '@sparrowstack/tool';
import type { DirectoryNode } from '@tools/getDirectoryStructure/function/common/interfaces/DirectoryNode';

export const maxCallCountExceededMessage = async (
	runtimeParams: RuntimeParams,
): Promise<string> => {
	const { lastCachedResult } = runtimeParams;
	const result = lastCachedResult?.result as DirectoryNode;

	// Note: return the result object as a string
	// When I JSON.stringify the result, I get 'overload' errors from the LLM.
	return `
	Max call count exceeded: This user is only allowed to make 1 'getDirectoryStructure' call.

	Please see results from the last 'getDirectoryStructure' request:
	${result}
	`;

	// return JSON.stringify(result);
};
