import { AgentLogger } from '@AgentLogger';
import { Anthropic } from '@anthropic-ai/sdk';
import { BaseLLM } from '@Agent/core/llms/BaseLLM';
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

interface IHandleToolCallsOptions {
	llm: BaseLLM;
	toolCalls: Array<{
		type: string;
		id: string;
		name: string;
		input: any;
	}>;
}

export const handleToolCalls = async ({
	llm,
	toolCalls,
}: IHandleToolCallsOptions) => {
	const toolResults = [];

	for (const toolCall of toolCalls) {
		// Assuming tools are registered somewhere in the llm instance
		const tool = llm.toolCalls?.[toolCall.name];

		if (!tool) {
			throw new Error(`Tool ${toolCall.name} not found`);
		}

		const result = await tool(toolCall.input);

		toolResults.push({
			result,
			id: toolCall.id,
		});
	}

	return toolResults;
};

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

	if (
		Array.isArray(responseMessage.toolCalls) &&
		responseMessage.toolCalls.length > 0
	) {
		const toolResults = await handleToolCalls({
			llm,
			toolCalls: responseMessage.toolCalls,
		});

		addAssistantMessageToMessages({
			llm,
			message: responseMessage.contentText,
			toolCalls: responseMessage.toolCalls,
		});

		addToolResultsToMessages({
			llm,
			toolResults,
		});

		infoLogMessages({
			logger,
			messages: llm.getMessages(),
		});

		// Get final response from LLM with tool results
		responseMessage = await sendContextToLLM({
			llm,
			anthropic,
		});

		infoLogLLMResponseMessage({
			logger,
			message: responseMessage,
		});
	}

	addAssistantMessageToMessages({
		llm,
		message: responseMessage.contentText,
	});

	return responseMessage;
};
