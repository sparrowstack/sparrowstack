import { BaseLLM } from '../../BaseLLM';
import { Anthropic } from '@anthropic-ai/sdk';
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
	anthropic: Anthropic;
}

export const sendMessage = async ({
	llm,
	logger,
	message,
	anthropic,
}: IOptions) => {
	const messages = addUserMessageToMessages({ llm, message });

	infoLogContext({
		messages,
		logger: logger,
		systemPrompt: llm.systemPrompt,
	});

	const responseMessage = await sendContextToLLM({
		llm,
		anthropic: anthropic,
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
