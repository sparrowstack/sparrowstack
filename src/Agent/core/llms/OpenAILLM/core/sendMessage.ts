import OpenAI from 'openai';
import { AgentLogger } from '@AgentLogger';
import { BaseLLM } from '@Agent/core/llms/BaseLLM';
import {
	infoLogContextWindow,
	infoLogLLMResponseMessage,
} from '@Agent/core/llms/OpenAILLM/common/infoLogs';
import {
	sendContextToLLM,
	addUserMessageToMessages,
	addAssistantMessageToMessages,
} from '@Agent/core/llms/OpenAILLM/common/utils';

interface IOptions {
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
}: IOptions) => {
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
