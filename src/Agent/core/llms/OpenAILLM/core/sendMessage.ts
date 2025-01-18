import OpenAI from 'openai';
import { BaseLLM } from '../../BaseLLM';
import { AgentLogger } from '../../../../../AgentLogger';
import { infoLogContext, infoLogLLMResponseMessage } from '../common/infoLogs';
import {
	sendContextToLLM,
	addUserMessageToMessages,
	addAssistantMessageToMessages,
} from '../common/utils';

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

	infoLogContext({
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
