import { Tool } from '@Tool';
import { Logger } from '@Logger';
import type { IToolParams } from '@Tool';
import { Role } from '@Agent/common/enums';
import { Provider, ProviderName } from '@Agent';
import { SystemPrompts, SystemPromptName } from '@SystemPrompts';
import {
	logContextWindow,
	logModelResponse,
} from '@Agent/core/llms/BaseLLM/common/loggers';
import type {
	IChatMessage,
	IModelResponse,
} from '@Agent/core/llms/BaseLLM/common/interfaces';

interface IConstructorOptions {
	model: string;
	provider: Provider;
	systemPrompt?: string;
	tools?: IToolParams[];
}

export abstract class BaseLLM {
	protected messages: IChatMessage[] = [];

	// Base
	readonly model: string;
	readonly provider: Provider;
	readonly providerName: string;
	readonly systemPrompt: string;
	readonly systemPromptName: string;

	// Utilities
	readonly logger: Logger;

	// Tools
	readonly tools?: Tool[];
	readonly functions?: Record<IToolParams['name'], IToolParams['function']>;

	// LLM Specific
	abstract readonly maxTokens: number;

	constructor({
		model,
		provider,
		systemPrompt,
		tools: toolsParams,
	}: IConstructorOptions) {
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

		// Tools
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

	public addUserMessage({ content }: { content: string }): void {
		this.messages.push({ role: Role.User, content });
	}

	public addAssistantMessage({ content }: { content: string }): void {
		// if (Array.isArray(toolCalls) && toolCalls.length > 0) {
		// 	const content = [{ type: 'text', text: message }, ...toolCalls];
		this.messages.push({ role: Role.Assistant, content });
	}

	public addToMessages({ message }: { message: IChatMessage }): void {
		this.messages.push(message);
	}

	public getMessages(): IChatMessage[] {
		return [...this.messages];
	}

	public clearMessages(): void {
		this.messages = [];
	}

	public logContextWindow(): void {
		// Two parts:
		// getLogTemplate
		// logContextWindow
		// args logLevel
		logContextWindow({
			logger: this.logger,
			messages: this.messages,
			systemPrompt: this.systemPrompt,
		});
	}

	public logModelResponse({ message }: { message: IModelResponse }): void {
		// Two parts:
		// getLogTemplate
		// logContextWindow
		// args logLevel
		logModelResponse({
			message,
			logger: this.logger,
		});
	}

	abstract sendMessage({
		message,
	}: {
		message: string;
	}): Promise<IModelResponse>;
}
