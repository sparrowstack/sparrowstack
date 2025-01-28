import { OpenAI } from 'openai';
import { Logger } from '@Logger';
import { Anthropic } from '@anthropic-ai/sdk';
import { Tool, type IToolParams } from '@Tool';
import { Provider, ProviderName } from '@Agent';
import { defaultPrompt } from '@SystemPrompts/default';
import { ToolsFactory } from '@Agent/core/ToolsFactory';
import { InteractionLogger } from '@Agent/core/InteractionLogger';
import { ProviderSDKFactory } from '@Agent/core/ProviderSDKFactory';
import { ChatMessageManager } from '@Agent/core/ChatMessageManager';
import { SystemPrompt, type ISystemPromptParams } from '@SystemPrompt';
import { ModelResponseAdapter } from '@Agent/core/ModelResponseAdapter';
import { SystemPromptFactory } from '@Agent/core/SystemPromptFactory';
import type { IModelResponse } from '@Agent/core/ModelResponseAdapter/common/interfaces';
import { ProviderFactory } from '@Agent/core/ProviderFactory';
import { OpenAIProvider } from '@Agent/core/Providers/OpenAIProvider';
import { AnthropicProvider } from '@Agent/core/Providers/AnthropicProvider';

class ModelRequest {
	static async execute({ llm }: { llm: BaseLLM }) {
		const rawResponse = await llm.providerStrategy.execute.sendPrompt({
			llm,
		});

		const responseMessage = ModelResponseAdapter.adapt({
			rawResponse,
			provider: llm.provider,
		});

		return responseMessage;
	}
}

class ToolCallManager {
	static async handleToolCalls({
		llm,
		responseMessage,
	}: {
		llm: BaseLLM;
		responseMessage: IModelResponse;
	}) {
		let toolCallResponseMessage: IModelResponse | null = null;

		if (
			Array.isArray(responseMessage.toolCalls) &&
			responseMessage.toolCalls.length > 0
		) {
			llm.interactionLogger.logModelResponse({
				message: responseMessage,
			});

			const assistantToolCallRequestMessage =
				llm.providerStrategy.adapters.toToolCallRequestMessage({
					responseMessage,
				});

			// ToolCallMessageRequestManager.add()
			llm.chatMessageManager.addToMessages({
				message: assistantToolCallRequestMessage,
			});

			// Execute tool calls
			const toolCallResults = await Promise.all(
				responseMessage.toolCalls.map(async (toolCall) => {
					const { id, name, parameters } = toolCall;
					const toolCallFunction = llm.functions![name];
					// TODO: JSON.parse(toolCall.function.arguments);
					const result = await toolCallFunction(parameters);

					return { id, result };
				}),
			);

			const assistantToolCallResponseMessages =
				llm.providerStrategy.adapters.toToolCallResponseMessages({
					toolCallResults,
				});

			// ToolCallMessageResponseManager.add()
			assistantToolCallResponseMessages.forEach((message) => {
				llm.chatMessageManager.addToMessages({
					message,
				});
			});

			// Log latest messages
			llm.interactionLogger.logMessages({
				messages: llm.chatMessageManager.getMessages(),
			});

			toolCallResponseMessage = await ModelRequest.execute({ llm });

			llm.interactionLogger.logModelResponse({
				message: toolCallResponseMessage,
			});
		}

		return toolCallResponseMessage;
	}
}

interface IConstructorParams {
	model: string;
	apiKey: string;
	provider: Provider;
	tools?: Tool[] | IToolParams[];
	systemPrompt?: SystemPrompt | ISystemPromptParams;
}

export class BaseLLM {
	// Provider Strategies
	readonly providerStrategy: OpenAIProvider | AnthropicProvider;

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
		// Provider Strategy
		// --------------------------------
		this.providerStrategy = ProviderFactory.create({ provider });

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
		this.chatMessageManager.addUserMessage({ text: message });

		this.interactionLogger.logContextWindow({ llm: this });

		const modelResponseMessage = await ModelRequest.execute({ llm: this });

		const toolCallResponseMessage = await ToolCallManager.handleToolCalls({
			llm: this,
			responseMessage: modelResponseMessage,
		});

		const responseMessage = toolCallResponseMessage || modelResponseMessage;

		this.chatMessageManager.addAssistantMessage({
			text: responseMessage.text,
		});

		return responseMessage;
	}
}
