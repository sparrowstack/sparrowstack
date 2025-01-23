import { Logger } from '@root/src/Logger';
import { Anthropic } from '@anthropic-ai/sdk';
import { BaseLLM } from '@root/src/Agent/core/llms/BaseLLM/BaseLLM';
// import { executeToolCalls } from '@Agent/core/llms/common/utils';
import { sendContextToLLM } from '@Agent/core/llms/AnthropicLLM/common/utils';
import {
	// infoLogMessages,
	infoLogContextWindow,
	infoLogLLMResponseMessage,
} from '@Agent/core/llms/common/infoLogs';
import {
	// addToolResultsToMessages,
	addUserMessageToMessages,
	addAssistantMessageToMessages,
} from '@Agent/core/llms/common/utils';

interface IParams {
	llm: BaseLLM;
	message: string;
	logger: Logger;
	anthropic: Anthropic;
}

export const sendMessage = async ({
	llm,
	logger,
	message,
	anthropic,
}: IParams) => {
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
