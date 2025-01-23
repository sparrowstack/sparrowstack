import OpenAI from 'openai';
import { BaseLLM } from '@Agent/core/llms/BaseLLM/BaseLLM';
import { sendContextToLLM } from '@Agent/core/llms/OpenAILLM/common/utils';

interface IParams {
	llm: BaseLLM;
	message: string;
	openai: OpenAI;
}

export const sendMessage = async ({ llm, message, openai }: IParams) => {
	llm.addUserMessage({ content: message });

	llm.logContextWindow();

	const responseMessage = await sendContextToLLM({
		llm,
		openai,
	});

	llm.logModelResponse({ message: responseMessage });

	llm.addAssistantMessage({ content: responseMessage.text });

	return responseMessage;
};
