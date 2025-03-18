import { getWeatherData } from '@tools/getWeatherData/function/getWeatherData';
import { validateGetWeatherDataToolCall } from '@tools/getWeatherData/validate';
import { validationFailedMessage } from '@tools/getWeatherData/validationFailedMessage';
import type { IGetWeatherDataParams } from '@tools/getWeatherData/function/common/interfaces';
import {
	PropertyType,
	type IToolParams,
	type IRuntimeParams,
} from '@sparrowstack/tool';

export const getWeatherDataToolParams: IToolParams = {
	name: 'getWeather',
	description: 'Get the weather for a given location.',
	function: async (weatherDataParams: IGetWeatherDataParams) => {
		return await getWeatherData(weatherDataParams);
	},
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
	validate: async (runtimeParams: IRuntimeParams) => {
		return await validateGetWeatherDataToolCall(runtimeParams);
	},
	// 	validationFailedMessage: `
	// TOOL_CALL_VALIDATION_CHECK_FAILED:
	// The user has exceeded the rate limit for the 'getWeather' tool (1 request per minute).
	// Please use the 'getWeather' result you provided in an earlier message.
	// `,
	validationFailedMessage: async (runtimeParams: IRuntimeParams) => {
		return await validationFailedMessage(runtimeParams);
	},
};
