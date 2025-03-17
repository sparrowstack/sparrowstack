import type { Tool } from '@sparrowstack/tool';
import type { IRuntimeParams } from '@sparrowstack/tool';

export const executeMaxCallCountCheck = async ({
	isValid,
	tool,
	runtimeParams,
}: {
	tool: Tool;
	isValid: boolean;
	runtimeParams: IRuntimeParams;
}) => {
	const hasExceededMaxCallCount =
		tool.maxCallCount && tool.getCallCount() >= tool.maxCallCount;
	let maxCallCountExceededMessage = null;

	if (isValid && hasExceededMaxCallCount) {
		// Set default max call count exceeded message
		maxCallCountExceededMessage = 'TOOL_CALL_MAX_CALL_COUNT_EXCEEDED';

		// If Tool has custom max call count exceeded message, use it
		if (tool.maxCallCountExceededMessage) {
			maxCallCountExceededMessage =
				typeof tool.maxCallCountExceededMessage === 'string'
					? tool.maxCallCountExceededMessage
					: await tool.maxCallCountExceededMessage(runtimeParams);
		}
	}

	return { hasExceededMaxCallCount, maxCallCountExceededMessage };
};
