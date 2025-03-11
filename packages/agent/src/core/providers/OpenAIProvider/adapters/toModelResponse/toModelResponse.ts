import OpenAI from 'openai';
import { ContentType } from '@core/providers/OpenAIProvider/common/enums';
import type { ModelResponse } from '@core/providers/BaseProvider/common/interfaces';
import { getToolCalls } from '@core/providers/OpenAIProvider/adapters/toModelResponse/common/utils';

export const toModelResponse = ({
	response,
}: {
	response: OpenAI.ChatCompletion;
}): ModelResponse => {
	const { id, model, usage, choices } = response;
	const {
		prompt_tokens: inputTokens = null,
		completion_tokens: outputTokens = null,
	} = usage || {};
	const choice = choices[0];
	const { message, finish_reason: stopReason } = choice;
	const { role, content } = message;
	const text = content || '';
	const type = ContentType.Message;
	const toolCalls = getToolCalls({ message });

	const modelResponse: ModelResponse = {
		id,
		role,
		model,
		type,
		text,
		stopReason,
		toolCalls,
		usage: {
			inputTokens,
			outputTokens,
		},
		rawMessage: response,
	};

	return modelResponse;
};

/**

OpenAI Message: Standard
-------------------------------
{
	id: 'chatcmpl-B9a7AA7bLfjrLSPFMEFW7ckUZTfbS',
	object: 'chat.completion',
	created: 1741623476,
	model: 'gpt-4o-2024-08-06',
	choices: [
		{
			index: 0,
			message: {
				role: 'assistant',
				content:
					'Hello! How can I assist you today with TypeScript, full-stack development, or any other technical inquiry you might have?',
				refusal: null,
			},
			logprobs: null,
			finish_reason: 'stop',
		},
	],
	usage: {
		prompt_tokens: 866,
		completion_tokens: 27,
		total_tokens: 893,
		prompt_tokens_details: {
			cached_tokens: 0,
			audio_tokens: 0,
		},
		completion_tokens_details: {
			reasoning_tokens: 0,
			audio_tokens: 0,
			accepted_prediction_tokens: 0,
			rejected_prediction_tokens: 0,
		},
	},
	service_tier: 'default',
	system_fingerprint: 'fp_f9f4fb6dbf',
	_request_id: 'req_4594b4df378e4f49af16cef7be9ee4e9',
};


OpenAI Message: Tool Call
-------------------------------
{
	id: 'chatcmpl-B9a9Iaqv2DG2O6CnYyE0rw13DlMn7',
	object: 'chat.completion',
	created: 1741623608,
	model: 'gpt-4o-2024-08-06',
	choices: [
		{
			index: 0,
			message: {
				role: 'assistant',
				content: null,
				tool_calls: [
					{
						id: 'call_8XL4qjqBOhAxmfpvzmZaxSZN',
						type: 'function',
						function: {
							name: 'getDirectoryStructure',
							arguments: '{}',
						},
					},
				],
				refusal: null,
			},
			logprobs: null,
			finish_reason: 'tool_calls',
		},
	],
	usage: {
		prompt_tokens: 897,
		completion_tokens: 12,
		total_tokens: 909,
		prompt_tokens_details: {
			cached_tokens: 0,
			audio_tokens: 0,
		},
		completion_tokens_details: {
			reasoning_tokens: 0,
			audio_tokens: 0,
			accepted_prediction_tokens: 0,
			rejected_prediction_tokens: 0,
		},
	},
	service_tier: 'default',
	system_fingerprint: 'fp_f9f4fb6dbf',
	_request_id: 'req_02cfbb70897405730fecd9d756e28cca',
};

OpenAI Message: Tool Call (with parameters)
---------------------------------------------
{
	id: 'chatcmpl-B9aC9DcUFqli58YSIpVZkh9Wvb1hL',
	object: 'chat.completion',
	created: 1741623785,
	model: 'gpt-4o-2024-08-06',
	choices: [
		{
			index: 0,
			message: {
				role: 'assistant',
				content: null,
				tool_calls: [
					{
						id: 'call_awfdxoPFVxc5rkyodgR7pXZ7',
						type: 'function',
						function: {
							name: 'getWeather',
							arguments:
								'{"city":"San Francisco","stateCode":"CA","countryCode":"US"}',
						},
					},
				],
				refusal: null,
			},
			logprobs: null,
			finish_reason: 'tool_calls',
		},
	],
	usage: {
		prompt_tokens: 1209,
		completion_tokens: 26,
		total_tokens: 1235,
		prompt_tokens_details: {
			cached_tokens: 1152,
			audio_tokens: 0,
		},
		completion_tokens_details: {
			reasoning_tokens: 0,
			audio_tokens: 0,
			accepted_prediction_tokens: 0,
			rejected_prediction_tokens: 0,
		},
	},
	service_tier: 'default',
	system_fingerprint: 'fp_f9f4fb6dbf',
	_request_id: 'req_3fc7cf43bf4a30766e9404ca6d9b5742',
};

*/
