import { OpenAI } from 'openai';
import { Logger } from '@Logger';
import { Anthropic } from '@anthropic-ai/sdk';
import { Tool, type IToolParams } from '@Tool';
import { Provider, ProviderName } from '@Agent';
import { defaultPrompt } from '@SystemPrompts/default';
import { InteractionLogger } from '@InteractionLogger';
import { ChatMessageManager } from '@ChatMessageManager';
import { ModelRequestAdapter } from '@ModelRequestAdapter';
import { ModelResponseAdapter } from '@ModelResponseAdapter';
import { SystemPrompt, type ISystemPromptParams } from '@SystemPrompt';
import type { IModelResponse } from '@ModelResponseAdapter/common/interfaces';

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

	// Provider API
	readonly sdk: OpenAI | Anthropic;

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
		if (provider === Provider.OpenAI) {
			this.sdk = new OpenAI({
				apiKey: this.apiKey,
			});
		} else if (provider === Provider.Anthropic) {
			this.sdk = new Anthropic({
				apiKey: this.apiKey,
			});
		} else {
			throw new Error(`Provider ${provider} not supported`);
		}

		// System Prompt
		// --------------------------------
		this.systemPrompt =
			systemPrompt instanceof SystemPrompt
				? systemPrompt
				: new SystemPrompt(systemPrompt);

		// Tool Calling
		// --------------------------------
		this.tools = tools?.map((tool) => {
			return tool instanceof Tool ? tool : new Tool(tool);
		});

		this.functions = this.tools?.reduce(
			(accumulator, tool) => ({
				...accumulator,
				[tool.name]: tool.function,
			}),
			{} as Record<Tool['name'], Tool['function']>,
		);

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
