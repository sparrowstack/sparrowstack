import { Role } from '@core/providers/AnthropicProvider/common/enums/Role';
import { ContentType } from '@core/providers/AnthropicProvider/common/enums';
import type { ToolCallResults } from '@core/providers/BaseProvider/common/interfaces';
import type {
	ToolCallResponseMessage,
	AnthropicToolCallResponseMessage,
} from '@core/providers/AnthropicProvider/common/interfaces';

export const toToolCallResponseMessages = ({
	toolCallResults,
}: ToolCallResults): ToolCallResponseMessage => {
	const toolResultMessages: AnthropicToolCallResponseMessage[] =
		toolCallResults.map((toolCallResult) => ({
			role: Role.User,
			content: [
				{
					type: ContentType.ToolResult,
					tool_use_id: toolCallResult.id,
					content: JSON.stringify(toolCallResult.result),
				},
			],
		}));

	return {
		customMessages: toolResultMessages,
	};
};

/**

Anthropic Message: Tool Response
--------------------------------
{
	role: 'user',
	content: [
		{
			type: 'tool_result',
			tool_use_id: 'toolu_019eHNoEuJo8LULk7AnGL3Cp',
			content:
				'{"requestTime":{"utc":"2025-03-10T15:06:27.000Z","local":"3/10/2025, 8:06:27 AM","timeZone":"America/Los_Angeles"},"weatherData":{"sunrise":{"utc":"2025-03-10T14:27:52.000Z","local":"3/10/2025, 7:27:52 AM","timeZone":"America/Los_Angeles"},"sunset":{"utc":"2025-03-11T02:12:03.000Z","local":"3/10/2025, 7:12:03 PM","timeZone":"America/Los_Angeles"},"temperature":{"value":46.13,"unit":"fahrenheit"},"feelsLike":{"value":44.87,"unit":"fahrenheit"},"humidity":{"value":83,"unit":"percent"},"dewPoint":{"value":41.27,"unit":"fahrenheit"},"uvIndex":0.12,"cloudCover":{"value":75,"unit":"percent"},"windSpeed":{"value":3.44,"unit":"mph"}}}',
		},
	],
};

*/
