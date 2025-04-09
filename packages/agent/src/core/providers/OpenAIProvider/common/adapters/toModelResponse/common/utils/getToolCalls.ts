import { OpenAI } from 'openai';

interface Params {
	response: OpenAI.Responses.Response;
}

export const getToolCalls = ({ response }: Params) => {
	const { output } = response;
	const toolCalls = output.filter((item) => item.type === 'function_call');

	const adaptedToolCalls = toolCalls?.map((toolCall) => {
		return {
			id: toolCall.id || '',
			name: toolCall.name,
			callId: toolCall.call_id,
			parameters: toolCall.arguments,
			status: toolCall.status,
			rawToolCall: toolCall,
		};
	});

	return adaptedToolCalls;
};

/** 

OpenAI Message: Tool Call
-------------------------------
{
  output: [
    {
      type: "function_call",
      id: "fc_67f5484d71908191bd8bc23ae5e7ad6b03a5fd15d97d166b",
      call_id: "call_623hoMeg1f1sxA5gfqKKDsqx",
      name: "getWeather",
      arguments: "{\n  \"city\": \"San Francisco\",\n  \"stateCode\": \"CA\",\n  \"countryCode\": \"US\"\n}",
      status: "completed",
    }
  ],
}

*/
