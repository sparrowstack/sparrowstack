import { Anthropic } from '@anthropic-ai/sdk';
import { BaseLLM } from '@Agent/core/llms/BaseLLM/BaseLLM';
import { ModelRequestAdapter } from '@ModelRequestAdapter';
import { ModelResponseAdapter } from '@ModelResponseAdapter';

interface IParams {
	llm: BaseLLM;
	message: string;
	anthropic: Anthropic;
}

export const sendMessage = async ({ llm, message }: IParams) => {
	llm.chatMessageManager.addUserMessage({ content: message });
	llm.interactionLogger.logContextWindow({ llm });

	const rawResponse = await ModelRequestAdapter.execute({ llm });

	const modelResponse = ModelResponseAdapter.adapt({
		rawResponse,
		provider: llm.provider,
	});

	llm.interactionLogger.logModelResponse({ message: modelResponse });

	llm.chatMessageManager.addAssistantMessage({
		content: modelResponse.text,
	});

	return modelResponse;
};
