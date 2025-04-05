import type { ToolCallResults } from '@core/providers/BaseProvider/common/interfaces';
import type { GoogleGenerativeAIToolCallResponseMessages } from '@core/providers/GoogleGenerativeAIProvider/common/types';
import { getAssistantMessages } from '@core/providers/GoogleGenerativeAIProvider/common/adapters/toToolCallResponseMessages/common/utils';

export const toToolCallResponseMessages = ({
	toolCallResults,
}: ToolCallResults): GoogleGenerativeAIToolCallResponseMessages => {
	const assistantMessages = getAssistantMessages(toolCallResults);

	return [...[assistantMessages]];
};

/**

Google Generative AI Message: Tool Call Response
-------------------------------------------------
{
	role: 'function',
	parts: [
		{
			functionResponse: {
				name: 'getWeather',
				response: {
					requestTime: {
						utc: '2025-03-11T02:07:22.000Z',
						local: '3/10/2025, 7:07:22 PM',
						timeZone: 'America/Los_Angeles',
					},
					weatherData: {
						sunrise: {
							utc: '2025-03-10T14:27:52.000Z',
							local: '3/10/2025, 7:27:52 AM',
							timeZone: 'America/Los_Angeles',
						},
						sunset: {
							utc: '2025-03-11T02:12:03.000Z',
							local: '3/10/2025, 7:12:03 PM',
							timeZone: 'America/Los_Angeles',
						},
						temperature: {
							value: 56.43,
							unit: 'fahrenheit',
						},
						feelsLike: {
							value: 54.54,
							unit: 'fahrenheit',
						},
						humidity: {
							value: 59,
							unit: 'percent',
						},
						dewPoint: {
							value: 42.3,
							unit: 'fahrenheit',
						},
						uvIndex: 0,
						cloudCover: {
							value: 75,
							unit: 'percent',
						},
						windSpeed: {
							value: 12.66,
							unit: 'mph',
						},
					},
				},
			},
		},
	],
}

*/
