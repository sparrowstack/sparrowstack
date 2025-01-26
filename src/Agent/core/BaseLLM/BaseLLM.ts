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
import { ModelRequestAdapter } from '@Agent/core/ModelRequestAdapter';
import { SystemPrompt, type ISystemPromptParams } from '@SystemPrompt';
import { ModelResponseAdapter } from '@Agent/core/ModelResponseAdapter';
import { SystemPromptFactory } from '@Agent/core/SystemPromptFactory';
import type { IModelResponse } from '@Agent/core/ModelResponseAdapter/common/interfaces';

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
		this.chatMessageManager = new ChatMessageManager({
			provider: this.provider,
		});
	}

	public async sendMessage({
		message,
	}: {
		message: string;
	}): Promise<IModelResponse> {
		this.chatMessageManager.addUserMessage({ content: message });

		this.interactionLogger.logContextWindow({ llm: this });

		const rawResponse = await ModelRequestAdapter.execute({ llm: this });

		const responseMessage = ModelResponseAdapter.adapt({
			rawResponse,
			provider: this.provider,
		});

		this.interactionLogger.logModelResponse({ message: responseMessage });

		this.chatMessageManager.addAssistantMessage({
			content: responseMessage.text,
		});

		return responseMessage;
	}
}
