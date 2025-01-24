import { Tool } from '@Tool';
import { Logger } from '@Logger';
import type { IToolParams } from '@Tool';
import { Provider, ProviderName } from '@Agent';
import { InteractionLogger } from '@InteractionLogger';
import { ChatMessageManager } from '@ChatMessageManager';
import { SystemPrompts, SystemPromptName } from '@SystemPrompts';
import type { IModelResponse } from '@Agent/core/llms/BaseLLM/common/interfaces';

interface IConstructorParams {
	model: string;
	provider: Provider;
	systemPrompt?: string;
	tools?: IToolParams[];
}

export abstract class BaseLLM {
	// Base
	readonly model: string;
	readonly provider: Provider;
	readonly providerName: string;
	readonly systemPrompt: string;
	readonly systemPromptName: string;

	// Utilities
	readonly logger: Logger;
	readonly interactionLogger: InteractionLogger;
	readonly chatMessageManager: ChatMessageManager;

	// Tool Calling
	readonly tools?: Tool[];
	readonly functions?: Record<IToolParams['name'], IToolParams['function']>;

	// LLM Specific
	abstract readonly maxTokens: number;

	constructor({
		model,
		provider,
		systemPrompt,
		tools: toolsParams,
	}: IConstructorParams) {
		// Base Properties
		// --------------------------------
		this.model = model; // e.g. 'gpt-4o'
		this.provider = provider; // e.g. 'openai'
		this.providerName = ProviderName[provider]; // e.g. 'OpenAI'
		this.systemPrompt = systemPrompt || SystemPrompts.Default; // e.g. 'You are a helpful assistant.'
		this.systemPromptName = SystemPromptName[this.systemPrompt]; // e.g. 'Default | SoftwareEngineerTypeScript'

		// Utilities
		// --------------------------------
		this.logger = new Logger(this.providerName);
		this.interactionLogger = new InteractionLogger({ logger: this.logger });
		this.chatMessageManager = new ChatMessageManager({
			provider: this.provider,
		});

		// Tool Calling
		// --------------------------------
		this.tools = toolsParams?.map((toolParams) => new Tool(toolParams));

		this.functions = toolsParams?.reduce(
			(accumulator, toolParams) => ({
				...accumulator,
				[toolParams.name]: toolParams.function,
			}),
			{} as Record<IToolParams['name'], IToolParams['function']>,
		);
		// --------------------------------
	}

	abstract sendMessage({
		message,
	}: {
		message: string;
	}): Promise<IModelResponse>;

	// public async sendMessage({
	// 	message,
	// }: {
	// 	message: string;
	// }): Promise<IModelResponse> {
	// 	this.chatMessageManager.addUserMessage({ content: message });

	// 	this.logContextWindow();

	// 	const responseMessage = await this.sendContextToLLM();

	// 	this.logModelResponse({ message: responseMessage });

	// 	this.chatMessageManager.addAssistantMessage({
	// 		content: responseMessage.text,
	// 	});

	// 	return responseMessage;
	// }
}
