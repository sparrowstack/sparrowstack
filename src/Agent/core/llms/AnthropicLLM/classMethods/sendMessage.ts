import { AgentLogger } from '@AgentLogger';
import { Anthropic } from '@anthropic-ai/sdk';
import { BaseLLM } from '@Agent/core/llms/BaseLLM';
import { executeToolCalls } from '@Agent/core/llms/common/utils';
import { sendContextToLLM } from '@Agent/core/llms/AnthropicLLM/common/utils';
import {
	infoLogMessages,
	infoLogContextWindow,
	infoLogLLMResponseMessage,
} from '@Agent/core/llms/common/infoLogs';
import {
	addToolResultsToMessages,
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

	let responseMessage = await sendContextToLLM({
		llm,
		anthropic,
	});

	infoLogLLMResponseMessage({
		logger,
		message: responseMessage,
	});

	// If LLM Response with Tool Calls, Handle tool calls
	// ----------------------------------------------------
	if (
		Array.isArray(responseMessage.toolCalls) &&
		responseMessage.toolCalls.length > 0
	) {
		// Add AssistantTool Call Response to Messages
		addAssistantMessageToMessages({
			llm,
			message: responseMessage.contentText,
			toolCalls: responseMessage.toolCalls,
		});

		// Execute tool calls
		const toolCallResults = await executeToolCalls({
			llmToolCalls: llm.toolCalls,
			toolCalls: responseMessage.toolCalls,
		});

		// Add Tool Results to Messages
		addToolResultsToMessages({
			llm,
			toolCallResults,
		});

		// Log Messages
		infoLogMessages({
			logger,
			messages: llm.getMessages(),
		});

		// Send LLM updated messages with tool call results,
		// Get final response from LLM with tool results in repsonse
		responseMessage = await sendContextToLLM({
			llm,
			anthropic,
		});

		// Log LLM Response
		infoLogLLMResponseMessage({
			logger,
			message: responseMessage,
		});
	}
	// ----------------------------------------------------

	addAssistantMessageToMessages({
		llm,
		message: responseMessage.contentText,
	});

	return responseMessage;
};
