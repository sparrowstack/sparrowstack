import type { Tool } from '@sparrowstack/tool';
import type { RuntimeParams } from '@sparrowstack/tool';
import type { ModelResponseToolCall } from '@core/providers/BaseProvider/common/interfaces';
import {
	executeToolCall,
	executeValidationCheck,
	executeMaxCallCountCheck,
} from '@core/ToolCallManager/methods/executeToolCalls/common/utils';

export const getToolCallResult = async ({
	tool,
	toolCall,
	runtimeParams,
}: {
	tool: Tool;
	runtimeParams: RuntimeParams;
	toolCall: ModelResponseToolCall;
}) => {
	let result: unknown;

	const { isValid, validationFailedMessage } = await executeValidationCheck({
		tool,
		runtimeParams,
	});

	const { hasExceededMaxCallCount, maxCallCountExceededMessage } =
		await executeMaxCallCountCheck({
			tool,
			isValid,
			runtimeParams,
		});

	if (isValid && !hasExceededMaxCallCount) {
		result = await executeToolCall({
			tool,
			toolCall,
		});
	} else if (!isValid) {
		// The error object is for Gemini compatibility
		// but seems to work for all providers
		result = {
			error: {
				message: validationFailedMessage,
			},
		};
	} else if (hasExceededMaxCallCount) {
		// The error object is for Gemini compatibility
		// but seems to work for all providers
		result = {
			error: {
				message: maxCallCountExceededMessage,
			},
		};
	}

	return result;
};
