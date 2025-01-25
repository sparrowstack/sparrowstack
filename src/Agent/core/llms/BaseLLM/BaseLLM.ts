import { Logger } from '@Logger';
import { Tool, type IToolParams } from '@Tool';
import { Provider, ProviderName } from '@Agent';
import { defaultPrompt } from '@SystemPrompts/default';
import { InteractionLogger } from '@InteractionLogger';
import { ChatMessageManager } from '@ChatMessageManager';
import { SystemPrompt, type ISystemPromptParams } from '@SystemPrompt';
import type { IModelResponse } from '@Agent/core/ModelResponseAdapter/common/interfaces';

interface IConstructorParams {
	model: string;
	provider: Provider;
	tools?: Tool[] | IToolParams[];
	systemPrompt?: SystemPrompt | ISystemPromptParams;
}

export abstract class BaseLLM {
	// Base
	readonly model: string;
	readonly provider: Provider;
	readonly providerName: string;
	readonly systemPrompt: SystemPrompt;

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
		tools,
		provider,
		systemPrompt = defaultPrompt,
	}: IConstructorParams) {
		// Base Properties
		// --------------------------------
		this.model = model; // e.g. 'gpt-4o'
		this.provider = provider; // e.g. 'openai'
		this.providerName = ProviderName[provider]; // e.g. 'OpenAI'

		// Utilities
		// --------------------------------
		this.logger = new Logger(this.providerName);
		this.interactionLogger = new InteractionLogger({ logger: this.logger });
		this.chatMessageManager = new ChatMessageManager({
			provider: this.provider,
		});

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
