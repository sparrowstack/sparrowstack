import { z } from 'zod';
import { getWeatherData } from '@tools/getWeatherData/function/getWeatherData';
import { validateGetWeatherDataToolCall } from '@tools/getWeatherData/validate';
import { validationFailedMessage } from '@tools/getWeatherData/validationFailedMessage';
import type { GetWeatherDataParams } from '@tools/getWeatherData/function/common/interfaces';
import {
	PropertyType,
	type ToolParams,
	type RuntimeParams,
} from '@sparrowstack/tool';

export const getWeatherDataToolParams: ToolParams = {
	name: 'getWeather',
	description: 'Get the weather for a given location.',
	function: async (weatherDataParams: GetWeatherDataParams) => {
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
	validate: async (runtimeParams: RuntimeParams) => {
		return await validateGetWeatherDataToolCall(runtimeParams);
	},
	// 	validationFailedMessage: `
	// TOOL_CALL_VALIDATION_CHECK_FAILED:
	// The user has exceeded the rate limit for the 'getWeather' tool (1 request per minute).
	// Please use the 'getWeather' result you provided in an earlier message.
	// `,
	validationFailedMessage: async (runtimeParams: RuntimeParams) => {
		return await validationFailedMessage(runtimeParams);
	},
	structuredOutput: z.object({
		requestTime: z.object({
			utc: z.string(), // ISO date string
			local: z.string(), // localized date string
			timeZone: z.string(),
		}),
		weatherData: z.object({
			sunrise: z.object({
				utc: z.string(),
				local: z.string(),
				timeZone: z.string(),
			}),
			sunset: z.object({
				utc: z.string(),
				local: z.string(),
				timeZone: z.string(),
			}),
			temperature: z.object({
				value: z.number(),
				unit: z.literal('fahrenheit'),
			}),
			feelsLike: z.object({
				value: z.number(),
				unit: z.literal('fahrenheit'),
			}),
			humidity: z.object({
				value: z.number(),
				unit: z.literal('percent'),
			}),
			dewPoint: z.object({
				value: z.number(),
				unit: z.literal('fahrenheit'),
			}),
			uvIndex: z.number(),
			cloudCover: z.object({
				value: z.number(),
				unit: z.literal('percent'),
			}),
			windSpeed: z.object({
				value: z.number(),
				unit: z.literal('mph'),
			}),
		}),
	}),
};

// const example: {
// 	requestTime: {
// 		utc: '2025-03-28T15:54:40.000Z';
// 		local: '3/28/2025, 8:54:40 AM';
// 		timeZone: 'America/Los_Angeles';
// 	};
// 	weatherData: {
// 		sunrise: {
// 			utc: '2025-03-28T14:00:23.000Z';
// 			local: '3/28/2025, 7:00:23 AM';
// 			timeZone: 'America/Los_Angeles';
// 		};
// 		sunset: {
// 			utc: '2025-03-29T02:28:37.000Z';
// 			local: '3/28/2025, 7:28:37 PM';
// 			timeZone: 'America/Los_Angeles';
// 		};
// 		temperature: { value: 53.4; unit: 'fahrenheit' };
// 		feelsLike: { value: 52.63; unit: 'fahrenheit' };
// 		humidity: { value: 89; unit: 'percent' };
// 		dewPoint: { value: 50.25; unit: 'fahrenheit' };
// 		uvIndex: 1.03;
// 		cloudCover: { value: 75; unit: 'percent' };
// 		windSpeed: { value: 14; unit: 'mph' };
// 	};
// };
