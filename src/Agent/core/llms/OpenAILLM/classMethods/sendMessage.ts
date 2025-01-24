import OpenAI from 'openai';
import { BaseLLM } from '@Agent/core/llms/BaseLLM/BaseLLM';
import { sendContextToLLM } from '@Agent/core/llms/OpenAILLM/common/utils';

interface IParams {
	llm: BaseLLM;
	message: string;
	openai: OpenAI;
}

export const sendMessage = async ({ llm, message, openai }: IParams) => {
	llm.chatMessageManager.addUserMessage({ content: message });

	llm.interactionLogger.logContextWindow({ llm });

	const responseMessage = await sendContextToLLM({
		llm,
		openai,
	});

	llm.interactionLogger.logModelResponse({ message: responseMessage });

	llm.chatMessageManager.addAssistantMessage({
		content: responseMessage.text,
	});

	return responseMessage;
};
