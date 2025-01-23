import OpenAI from 'openai';
import { AgentLogger } from '@AgentLogger';
import { BaseLLM } from '@Agent/core/llms/BaseLLM';
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
	logger: AgentLogger;
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
