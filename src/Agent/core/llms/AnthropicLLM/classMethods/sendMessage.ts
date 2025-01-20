import { AgentLogger } from '@AgentLogger';
import { Anthropic } from '@anthropic-ai/sdk';
import { BaseLLM } from '@Agent/core/llms/BaseLLM';
import { sendContextToLLM } from '@Agent/core/llms/AnthropicLLM/common/utils';
import {
	infoLogContextWindow,
	infoLogLLMResponseMessage,
} from '@Agent/core/llms/common/infoLogs';
import {
	addUserMessageToMessages,
	addAssistantMessageToMessages,
} from '@Agent/core/llms/common/utils';

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

	infoLogContextWindow({
		messages,
		logger: logger,
		systemPrompt: llm.systemPrompt,
	});

	const responseMessage = await sendContextToLLM({
		llm,
		anthropic,
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
