import { getWeatherData } from '@sparrowstack/tools/src/getWeatherData/function/getWeatherData';
// import { validateGetWeatherDataToolCall } from '@sparrowstack/tools/src/getWeatherData/validate';
// import { validationFailedMessage } from '@sparrowstack/tools/src/getWeatherData/validationFailedMessage';
import type { IGetWeatherDataParams } from '@sparrowstack/tools/src/getWeatherData/function/common/interfaces';
import {
	PropertyType,
	type IToolParams,
	/* type IRuntimeParams, */
} from '@sparrowstack/tool';

export const getWeatherDataToolParams: IToolParams = {
	name: 'getWeather',
	description: 'Get the weather for a given location',
	function: async (weatherDataParams: IGetWeatherDataParams) => {
		return await getWeatherData(weatherDataParams);
	},
	// validate: async (runtimeParams: IRuntimeParams) => {
	// 	return await validateGetWeatherDataToolCall(runtimeParams);
	// },
	// 	validationFailedMessage: `
	// TOOL_CALL_VALIDATION_CHECK_FAILED:
	// The user has exceeded the rate limit for the 'getWeather' tool (1 request per minute).
	// Please use the 'getWeather' result you provided in an earlier message.
	// `,
	// validationFailedMessage: async (runtimeParams: IRuntimeParams) => {
	// 	return await validationFailedMessage(runtimeParams);
	// },
	parameters: {
		city: {
			required: true,
			type: PropertyType.String,
			description: 'The city to get the weather for.',
		},
		stateCode: {
			required: true,
			type: PropertyType.String,
			description: 'The state code to get the weather for.',
		},
		countryCode: {
			required: true,
			type: PropertyType.String,
			description: 'The country code to get the weather for.',
		},
	},
};
