import type { Tool } from '@sparrowstack/tool';
import type { IRuntimeParams } from '@sparrowstack/tool';

export const executeValidationCheck = async ({
	tool,
	runtimeParams,
}: {
	tool: Tool;
	runtimeParams: IRuntimeParams;
}) => {
	let isValid = true;
	let validationFailedMessage = null;

	if (tool.validate) {
		// Run validation
		isValid = await tool.validate(runtimeParams);

		// If validation fails, set validation failed message
		if (!isValid) {
			// Set default validation failed message
			validationFailedMessage = 'TOOL_CALL_VALIDATION_CHECK_FAILED';

			// If Tool has custom validation failed message, use it
			if (tool.validationFailedMessage) {
				validationFailedMessage =
					typeof tool.validationFailedMessage === 'string'
						? tool.validationFailedMessage
						: await tool.validationFailedMessage(runtimeParams);
			}
		}
	}

	return { isValid, validationFailedMessage };
};
