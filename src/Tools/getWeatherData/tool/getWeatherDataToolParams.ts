import {
	PropertyType,
	type IToolParams,
	// type IValidateParams,
} from '@sparrowstack/tool';
import { getWeatherData } from '@Tools/getWeatherData/function/getWeatherData';
import { validateGetWeatherDataToolCall } from '@Tools/getWeatherData/validate';
import type { IGetWeatherDataParams } from '@Tools/getWeatherData/function/common/interfaces';

export const getWeatherDataToolParams: IToolParams = {
	name: 'getWeather',
	description: 'Get the weather for a given location',
	function: async (weatherDataParams: IGetWeatherDataParams) => {
		return await getWeatherData(weatherDataParams);
	},
	maxCallCount: 2,
	validate: async (/*validateParams: IValidateParams*/) => {
		return await validateGetWeatherDataToolCall(/*validateParams*/);
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
};
