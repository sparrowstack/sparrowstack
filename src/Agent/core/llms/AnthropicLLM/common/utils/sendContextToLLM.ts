import { Anthropic } from '@anthropic-ai/sdk';
import { BaseLLM } from '@Agent/core/llms/BaseLLM';
import { convertAnthropicMessageToLLMResponseMessage } from '@Agent/core/llms/AnthropicLLM/common/utils/convertAnthropicMessageToLLMResponseMessage';

interface IOptions {
	llm: BaseLLM;
	anthropic: Anthropic;
}

export const sendContextToLLM = async ({ llm, anthropic }: IOptions) => {
	const anthropicResponseMessage = await anthropic.messages.create({
		messages: llm.getMessages() as Anthropic.MessageParam[],
		model: llm.model,
		max_tokens: llm.maxTokens,
		system: llm.systemPrompt,
	});

	const responseMessage = convertAnthropicMessageToLLMResponseMessage({
		message: anthropicResponseMessage,
	});

	return responseMessage;
};
