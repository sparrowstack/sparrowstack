import { Anthropic } from '@anthropic-ai/sdk';
import type { ModelResponse } from '@core/providers/BaseProvider/common/interfaces';
import {
	getToolCalls,
	getModelResponseText,
} from '@core/providers/AnthropicProvider/common/adapters/toModelResponse/common/utils';

interface Params {
	response: Anthropic.Messages.Message;
}

export const toModelResponse = ({ response }: Params): ModelResponse => {
	const {
		id,
		role,
		type,
		model,
		stop_reason: stopReason,
		stop_sequence: stopSequence,
		usage,
	} = response;
	const { input_tokens: inputTokens, output_tokens: outputTokens } = usage;
	const { text } = getModelResponseText({
		response,
	});
	const toolCalls = getToolCalls({
		response,
	});

	const llmResponseMessage: ModelResponse = {
		id,
		role,
		model,
		type,
		text,
		stopReason,
		stopSequence,
		usage: {
			inputTokens,
			outputTokens,
		},
		toolCalls,
		rawMessage: response,
	};

	return llmResponseMessage;
};

/**

Anthropic Message: Standard
-------------------------------
{
	id: 'msg_019LZDahyujLagiLNC9AV8oh',
	type: 'message',
	role: 'assistant',
	model: 'claude-3-5-sonnet-20241022',
	content: [
		{
			type: 'text',
			text: "Hello! I'm SoftwareEngineerTypeScript, and I'm here to help you with any TypeScript, JavaScript, or full-stack development questions you might have. Whether you need assistance with:\n\n- Code architecture and design patterns\n- TypeScript implementations\n- Frontend or backend development\n- Database design\n- API development\n- Testing strategies\n- Performance optimization\n- Or any other development-related topics\n\nFeel free to ask your questions, and please provide as much context as possible so I can give you the most relevant and helpful answers. What would you like to work on today?",
		},
	],
	stop_reason: 'end_turn',
	stop_sequence: null,
	usage: {
		input_tokens: 739,
		cache_creation_input_tokens: 0,
		cache_read_input_tokens: 0,
		output_tokens: 120,
	},
};

Anthropic Message: Tool Call
-------------------------------
{
	id: 'msg_01XfCptmFeKYUGU5BPj4CcFg',
	type: 'message',
	role: 'assistant',
	model: 'claude-3-5-sonnet-20241022',
	content: [
		{
			type: 'text',
			text: "I'll help you get the directory structure of the current working project using the `get_directory_structure` function.",
		},
		{
			type: 'tool_use',
			id: 'toolu_01Fu8qw648A2ffFvXa8eFbkn',
			name: 'get_directory_structure',
			input: {
				directoryStructure: '.',
			},
		},
	],
	stop_reason: 'tool_use',
	stop_sequence: null,
	usage: {
		input_tokens: 1209,
		cache_creation_input_tokens: 0,
		cache_read_input_tokens: 0,
		output_tokens: 82,
	},
};

*/
