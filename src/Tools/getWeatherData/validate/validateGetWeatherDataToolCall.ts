import { type IValidateParams } from '@sparrowstack/tool';

export const validateGetWeatherDataToolCall = async ({
	context,
	callCount,
}: IValidateParams) => {
	let shouldCallTool = true;

	if (callCount > 0) {
		shouldCallTool = false;
	}

	console.log('');
	console.log('validateGetWeatherDataToolCall');
	console.log('callCount', callCount);
	console.log('shouldCallTool', shouldCallTool);
	// console.log('context', context);

	// Can you get me the weather? I'm in San Francisco, CA.

	return shouldCallTool;
};
