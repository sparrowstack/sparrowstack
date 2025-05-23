import type { OpenAI } from 'openai';
import type { ToolCallResults } from '@core/providers/BaseProvider/common/interfaces';
import type { OpenAIToolCallResponseMessages } from '@core/providers/OpenAIProvider/common/types';

export const toToolCallResponseMessages = ({
	toolCallResults,
}: ToolCallResults): OpenAIToolCallResponseMessages => {
	const toolResultMessages = toolCallResults.map((toolCallResult) => {
		return {
			type: 'function_call_output',
			call_id: toolCallResult.callId,
			output: toolCallResult.result,
		};
	}) as OpenAI.Responses.ResponseFunctionToolCallOutputItem[];

	return toolResultMessages;
};

/**
OpenAI Message: Tool Call Response
------------------------------------
{
	role: 'tool',
	tool_call_id: 'call_xvrtLokMS2huLhj6mijusOnW',
	content:
		'{"requestTime":{"utc":"2025-03-11T01:01:53.000Z","local":"3/10/2025, 6:01:53 PM","timeZone":"America/Los_Angeles"},"weatherData":{"sunrise":{"utc":"2025-03-10T14:27:52.000Z","local":"3/10/2025, 7:27:52 AM","timeZone":"America/Los_Angeles"},"sunset":{"utc":"2025-03-11T02:12:03.000Z","local":"3/10/2025, 7:12:03 PM","timeZone":"America/Los_Angeles"},"temperature":{"value":59.77,"unit":"fahrenheit"},"feelsLike":{"value":57.94,"unit":"fahrenheit"},"humidity":{"value":53,"unit":"percent"},"dewPoint":{"value":42.64,"unit":"fahrenheit"},"uvIndex":0.22,"cloudCover":{"value":75,"unit":"percent"},"windSpeed":{"value":16.11,"unit":"mph"}}}',
};
 
*/
