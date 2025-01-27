import { OpenAI } from 'openai';
import { Logger } from '@Logger';
import { Anthropic } from '@anthropic-ai/sdk';
import { Tool, type IToolParams } from '@Tool';
import { Role, Provider, ProviderName } from '@Agent';
import { defaultPrompt } from '@SystemPrompts/default';
import { ToolsFactory } from '@Agent/core/ToolsFactory';
import { InteractionLogger } from '@Agent/core/InteractionLogger';
import { ProviderSDKFactory } from '@Agent/core/ProviderSDKFactory';
import { ChatMessageManager } from '@Agent/core/ChatMessageManager';
import { ModelRequestAdapter } from '@Agent/core/ModelRequestAdapter';
import { SystemPrompt, type ISystemPromptParams } from '@SystemPrompt';
import { ModelResponseAdapter } from '@Agent/core/ModelResponseAdapter';
import { SystemPromptFactory } from '@Agent/core/SystemPromptFactory';
import type { IModelResponse } from '@Agent/core/ModelResponseAdapter/common/interfaces';

// OpenAI
//--------------------------------
const addaptOpenAIToolCallRequestMessage = ({
	responseMessage,
}: {
	responseMessage: IModelResponse;
}) => {
	const toolCalls = responseMessage.toolCalls!.map((toolCall) => {
		return toolCall.rawToolCall;
	}) as OpenAI.Chat.Completions.ChatCompletionMessageToolCall[];

	return {
		role: Role.Assistant,
		tool_calls: toolCalls,
	};
};

// {
// 	"role": "assistant",
// 	"tool_calls": [
// 	{
// 		"id": "call_1",
// 		"type": "function",
// 		"function": {
// 		"name": "getUserDetails",
// 		"arguments": "{ \"userId\": \"123\" }"
// 		}
// 	},
// 	{
// 		"id": "call_2",
// 		"type": "function",
// 		"function": {
// 		"name": "getDirectoryStructure",
// 		"arguments": "{}"
// 		}
// 	}
// 	]
// },

const addaptOpenAIToolCallResponseMessages = ({
	toolCallResults,
}: {
	toolCallResults: {
		id: string;
		result: unknown;
	}[];
}) => {
	const toolResultMessages = toolCallResults.map((toolCallResults) => {
		return {
			role: 'tool',
			tool_call_id: toolCallResults.id,
			content: JSON.stringify(toolCallResults.result),
		};
	});
	// {
	//   "role": "tool",
	//   "tool_call_id": "call_1",
	//   "content": "{\"name\":\"John Doe\",\"email\":\"john.doe@example.com\"}"
	// },
	// {
	//   "role": "tool",
	//   "tool_call_id": "call_2",
	//   "content": "{\"name\":\"project-folder\",\"type\":\"directory\",\"children\": [...]}"
	// }

	return [...toolResultMessages];
};
//--------------------------------

interface IConstructorParams {
	model: string;
	apiKey: string;
	provider: Provider;
	tools?: Tool[] | IToolParams[];
	systemPrompt?: SystemPrompt | ISystemPromptParams;
}

export class BaseLLM {
	// Base
	readonly model: string;
	readonly apiKey: string;
	readonly provider: Provider;
	readonly providerName: string;
	readonly systemPrompt: SystemPrompt;

	// Provider SDK
	readonly providerSDK: OpenAI | Anthropic;

	// Utilities
	readonly logger: Logger;
	readonly interactionLogger: InteractionLogger;
	readonly chatMessageManager: ChatMessageManager;

	// Tool Calling
	readonly tools?: Tool[];
	readonly functions?: Record<IToolParams['name'], IToolParams['function']>;

	// Settings
	readonly maxTokens: number;

	constructor({
		model,
		tools,
		apiKey,
		provider,
		systemPrompt = defaultPrompt,
	}: IConstructorParams) {
		// Base Properties
		// --------------------------------
		this.model = model; // e.g. 'gpt-4o'
		this.apiKey = apiKey;
		this.provider = provider; // e.g. 'openai'
		this.providerName = ProviderName[provider]; // e.g. 'OpenAI'

		// Provider SDK
		// --------------------------------
		this.providerSDK = ProviderSDKFactory.create({
			apiKey: this.apiKey,
			provider: this.provider,
		});

		// System Prompt
		// --------------------------------
		this.systemPrompt = SystemPromptFactory.create({ systemPrompt });

		// Tool Calling
		// --------------------------------
		const toolsRegistry = ToolsFactory.create({ tools });

		this.tools = toolsRegistry?.tools;
		this.functions = toolsRegistry?.functions;

		// Settings
		// --------------------------------
		this.maxTokens = 1024;

		// Utilities
		// --------------------------------
		this.logger = new Logger(this.providerName);
		this.interactionLogger = new InteractionLogger({ logger: this.logger });
		this.chatMessageManager = new ChatMessageManager();
	}

	public async sendMessage({
		message,
	}: {
		message: string;
	}): Promise<IModelResponse> {
		let toolCallResponseMessage: IModelResponse | null = null;

		this.chatMessageManager.addUserMessage({ text: message });

		this.interactionLogger.logContextWindow({ llm: this });

		const rawResponse = await ModelRequestAdapter.execute({ llm: this });

		const responseMessage = ModelResponseAdapter.adapt({
			rawResponse,
			provider: this.provider,
		});

		if (
			Array.isArray(responseMessage.toolCalls) &&
			responseMessage.toolCalls.length > 0
		) {
			if (this.provider === Provider.OpenAI) {
				// ToolCallMessageRequestAdapter.adapt()
				const assistantToolCallRequestMessage =
					addaptOpenAIToolCallRequestMessage({
						responseMessage,
					});

				// ToolCallMessageRequestManager.add()
				this.chatMessageManager.addToMessages({
					message: assistantToolCallRequestMessage,
				});

				// Execute tool calls
				const toolCallResults = await Promise.all(
					responseMessage.toolCalls.map(async (toolCall) => {
						const { id, name, parameters } = toolCall;
						const toolCallFunction = this.functions![name];
						// TODO: JSON.parse(toolCall.function.arguments);
						const result = await toolCallFunction(parameters);

						return { id, result };
					}),
				);

				// ToolCallMessageResponseAdapter.adapt()
				const assistantToolCallResponseMessages =
					addaptOpenAIToolCallResponseMessages({ toolCallResults });

				// ToolCallMessageResponseManager.add()
				assistantToolCallResponseMessages.forEach((message) => {
					this.chatMessageManager.addToMessages({
						message,
					});
				});

				// Log latest messages
				this.interactionLogger.logMessages({
					messages: this.chatMessageManager.getMessages(),
				});

				const toolCallRawResponse = await ModelRequestAdapter.execute({
					llm: this,
				});

				toolCallResponseMessage = ModelResponseAdapter.adapt({
					rawResponse: toolCallRawResponse,
					provider: this.provider,
				});

				this.interactionLogger.logModelResponse({
					message: toolCallResponseMessage,
				});
			}

			// Keep this for Anthropic
			if (this.provider === Provider.Anthropic) {
				// ToolCallMessageRequestAdapter.adapt()
				const assistantToolCallRequestMessage =
					addaptOpenAIToolCallRequestMessage({
						responseMessage,
					});

				// ToolCallMessageRequestManager.add()
				// this.chatMessageManager.addToMessages({
				// 	message: assistantToolCallRequestMessage,
				// });

				// Execute tool calls
				// const toolCallResults = await Promise.all(
				// 	responseMessage.toolCalls.map(async (toolCall) => {
				// 		const { id, name, parameters } = toolCall;
				// 		const toolCallFunction = this.functions![name];
				// 		// TODO: JSON.parse(toolCall.function.arguments);
				// 		const result = await toolCallFunction(parameters);

				// 		return { id, result };
				// 	}),
				// );

				// ToolCallMessageResponseAdapter.adapt()
				// const assistantToolCallResponseMessages =
				// 	addaptOpenAIToolCallResponseMessages({ toolCallResults });

				// ToolCallMessageResponseManager.add()
				// assistantToolCallResponseMessages.forEach((message) => {
				// 	this.chatMessageManager.addToMessages({
				// 		message,
				// 	});
				// });

				// Log latest messages
				// this.interactionLogger.logMessages({
				// 	messages: this.chatMessageManager.getMessages(),
				// });

				// const toolCallRawResponse = await ModelRequestAdapter.execute({
				// 	llm: this,
				// });

				// toolCallResponseMessage = ModelResponseAdapter.adapt({
				// 	rawResponse: toolCallRawResponse,
				// 	provider: this.provider,
				// });

				// this.interactionLogger.logModelResponse({
				// 	message: toolCallResponseMessage,
				// });
			}
		}

		this.chatMessageManager.addAssistantMessage({
			text: toolCallResponseMessage?.text || responseMessage.text,
		});

		return toolCallResponseMessage || responseMessage;
	}
}
