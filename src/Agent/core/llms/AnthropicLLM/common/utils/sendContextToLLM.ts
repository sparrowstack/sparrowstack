import { Anthropic } from '@anthropic-ai/sdk';
import { BaseLLM } from '@Agent/core/llms/BaseLLM/BaseLLM';
import { convertAnthropicMessageToLLMResponseMessage } from '@Agent/core/llms/AnthropicLLM/common/utils/convertAnthropicMessageToLLMResponseMessage';

interface IParams {
	llm: BaseLLM;
	anthropic: Anthropic;
}

// TODO: executeLLMRequest
export const sendContextToLLM = async ({ llm, anthropic }: IParams) => {
	const anthropicResponseMessage = await anthropic.messages.create({
		messages: llm.getMessages() as Anthropic.MessageParam[],
		model: llm.model,
		max_tokens: llm.maxTokens,
		system: llm.systemPrompt,
		// TODO: Add llmTools
		// Better name for this?
		// tools: llm.tools,
	});

	const responseMessage = convertAnthropicMessageToLLMResponseMessage({
		message: anthropicResponseMessage,
	});

	return responseMessage;
};
