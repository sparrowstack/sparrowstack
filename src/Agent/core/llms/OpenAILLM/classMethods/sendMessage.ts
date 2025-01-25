import { BaseLLM } from '@Agent/core/llms/BaseLLM/BaseLLM';
import { ModelResponseAdapter } from '@ModelResponseAdapter';
import { ModelRequestAdapter } from '@ModelRequestAdapter';

interface IParams {
	llm: BaseLLM;
	message: string;
}

export const sendMessage = async ({ llm, message }: IParams) => {
	llm.chatMessageManager.addUserMessage({ content: message });

	llm.interactionLogger.logContextWindow({ llm });

	const rawResponse = await ModelRequestAdapter.execute({ llm });

	const responseMessage = ModelResponseAdapter.adapt({
		rawResponse,
		provider: llm.provider,
	});

	llm.interactionLogger.logModelResponse({ message: responseMessage });

	llm.chatMessageManager.addAssistantMessage({
		content: responseMessage.text,
	});

	return responseMessage;
};
