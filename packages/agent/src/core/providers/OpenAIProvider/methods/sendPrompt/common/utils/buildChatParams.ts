import OpenAI from 'openai';
import type { Settings } from '@agent/common/interfaces';
import { SystemPrompt } from '@sparrowstack/system-prompt';
import { Include } from '@core/providers/OpenAIProvider/methods/sendPrompt/common/enums/Include';

interface IParams {
	model: string;
	settings?: Settings;
	systemPrompt: SystemPrompt;
	tools: OpenAI.Responses.Tool[];
	responseFormat: Record<string, unknown>;
	chatMessages: OpenAI.Responses.ResponseOutputItem[];
}

export const buildChatParams = ({
	model,
	tools,
	settings,
	systemPrompt,
	chatMessages,
	responseFormat,
}: IParams) => {
	const input = chatMessages;
	const instructions = systemPrompt.getPrompt();
	const include = [
		Include.FileSearchCallResults,
		Include.MessageInputImageImageUrl,
		Include.ComputerCallOutputOutputImageUrl,
	] as OpenAI.Responses.ResponseIncludable[];
	const max_output_tokens = settings?.maxTokens ?? 4096;
	const responseCreateParams: OpenAI.Responses.ResponseCreateParams = {
		model,
		tools,
		input,
		include,
		instructions,
		max_output_tokens,
	};

	// o-series models do not support temperature
	const isReasoningModel = model.charAt(0) === 'o';
	if (!isReasoningModel) {
		responseCreateParams.temperature = settings?.temperature ?? 0.5;
	}

	if (responseFormat) {
		responseCreateParams.text = {
			format: {
				type: 'json_schema',
				schema: responseFormat,
				name: 'response_format',
			},
		};
	}

	// o-series models only
	// const stream = true;
	// const reasoning = true;
	// const parallel_tool_calls = true;

	return responseCreateParams;
};
