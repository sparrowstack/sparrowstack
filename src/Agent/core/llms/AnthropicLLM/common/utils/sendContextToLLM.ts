import { BaseLLM } from '../../../BaseLLM';
import { Anthropic } from '@anthropic-ai/sdk';
import { convertAnthropicMessageToLLMResponseMessage } from './convertAnthropicMessageToLLMResponseMessage';

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
