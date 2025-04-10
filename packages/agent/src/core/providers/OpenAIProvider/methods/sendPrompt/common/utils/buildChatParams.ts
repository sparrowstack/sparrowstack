import OpenAI from 'openai';
import type { Settings } from '@agent/common/interfaces';
import { SystemPrompt } from '@sparrowstack/system-prompt';
import { Include } from '@core/providers/OpenAIProvider/methods/sendPrompt/common/enums/Include';
import {
	ResponseFormatName,
	ResponseFormatType,
} from '@core/providers/OpenAIProvider/methods/sendPrompt/common/enums';

interface Params {
	model: string;
	settings?: Settings;
	systemPrompt: SystemPrompt;
	responseFormatName?: string;
	tools: OpenAI.Responses.Tool[];
	responseFormat?: Record<string, any>;
	chatMessages: OpenAI.Responses.ResponseOutputItem[];
}

export const buildChatParams = ({
	model,
	tools,
	settings,
	systemPrompt,
	chatMessages,
	responseFormat,
	responseFormatName,
}: Params) => {
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
		const zodSchema = responseFormat?.json_schema?.schema;
		const schema = zodSchema
			? zodSchema
			: responseFormat?.json_schema?.schema;

		responseCreateParams.text = {
			format: {
				type: ResponseFormatType.JsonSchema,
				name: responseFormatName ?? ResponseFormatName.Default,
				schema: schema,
			},
		};
	}

	// o-series models only
	// const stream = true;
	// const reasoning = true;
	// const parallel_tool_calls = true;

	return responseCreateParams;
};
