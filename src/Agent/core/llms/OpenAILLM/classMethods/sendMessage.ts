import OpenAI from 'openai';
import { Logger } from '@root/src/Logger';
import { BaseLLM } from '@root/src/Agent/core/llms/BaseLLM/BaseLLM';
import { sendContextToLLM } from '@Agent/core/llms/OpenAILLM/common/utils';
import {
	infoLogContextWindow,
	infoLogLLMResponseMessage,
} from '@Agent/core/llms/common/infoLogs';
import {
	addUserMessageToMessages,
	addAssistantMessageToMessages,
} from '@Agent/core/llms/common/utils';

interface IParams {
	llm: BaseLLM;
	message: string;
	logger: Logger;
	openai: OpenAI;
}

export const sendMessage = async ({
	llm,
	logger,
	message,
	openai,
}: IParams) => {
	const messages = addUserMessageToMessages({ llm, message });

	infoLogContextWindow({
		messages,
		logger: logger,
		systemPrompt: llm.systemPrompt,
	});

	const responseMessage = await sendContextToLLM({
		llm,
		openai,
	});

	infoLogLLMResponseMessage({
		logger,
		message: responseMessage,
	});

	addAssistantMessageToMessages({
		llm,
		message: responseMessage.contentText,
	});

	return responseMessage;
};
