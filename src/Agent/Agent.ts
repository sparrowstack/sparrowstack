import { Provider } from '@Agent';
import { Logger } from '@Logger';
import { Tool, type IToolParams } from '@Tool';
import { defaultPrompt } from '@SystemPrompts/default';
import { ToolsFactory } from '@Agent/core/ToolsFactory';
import { ToolCallManager } from '@Agent/core/ToolCallManager';
import { ProviderFactory } from '@Agent/core/ProviderFactory';
import type { IModelResponse } from '@Agent/common/interfaces';
import { InteractionLogger } from '@Agent/core/InteractionLogger';
import { ChatMessageManager } from '@Agent/core/ChatMessageManager';
import { SystemPromptFactory } from '@Agent/core/SystemPromptFactory';
import { OpenAIProvider } from '@Agent/core/providers/OpenAIProvider';
import { SystemPrompt, type ISystemPromptParams } from '@SystemPrompt';
import { AnthropicProvider } from '@Agent/core/providers/AnthropicProvider';

interface IConstructorParams {
	model: string;
	apiKey: string;
	provider: Provider;
	tools?: Tool[] | IToolParams[];
	systemPrompt?: SystemPrompt | ISystemPromptParams;
}

export class Agent {
	// Constants
	readonly providerDisplayName: string;

	// System Prompt
	readonly systemPrompt: SystemPrompt;

	// Tool Calling
	readonly tools?: Tool[];
	readonly functions?: Record<IToolParams['name'], IToolParams['function']>;

	// Utilities
	readonly logger: Logger;
	readonly interactionLogger: InteractionLogger;
	readonly chatMessageManager: ChatMessageManager;

	// Provider
	readonly provider: OpenAIProvider | AnthropicProvider;

	constructor({
		model,
		tools,
		apiKey,
		provider,
		systemPrompt = defaultPrompt,
	}: IConstructorParams) {
		// Constants
		// --------------------------------
		this.providerDisplayName =
			Object.keys(Provider).find(
				(key) => Provider[key as keyof typeof Provider] === provider,
			) || provider;

		// Classes with no dependencies
		// --------------------------------
		this.systemPrompt = SystemPromptFactory.create({
			systemPrompt,
		});

		const toolsRegistry = ToolsFactory.create({ tools });

		this.tools = toolsRegistry?.tools;
		this.functions = toolsRegistry?.functions;

		// Classes with dependencies
		// --------------------------------
		this.logger = new Logger(this.providerDisplayName);
		this.chatMessageManager = new ChatMessageManager();
		this.interactionLogger = new InteractionLogger({
			logger: this.logger,
			systemPrompt: this.systemPrompt,
			chatMessageManager: this.chatMessageManager,
		});

		// Provider
		// --------------------------------
		this.provider = ProviderFactory.create({
			model,
			apiKey,
			provider,
			displayName: this.providerDisplayName,
			chatMessageManager: this.chatMessageManager,
		});
	}

	public async sendMessage({
		message,
	}: {
		message: string;
	}): Promise<IModelResponse> {
		this.chatMessageManager.addUserMessage({ text: message });

		this.interactionLogger.logContextWindow();

		const modelResponseMessage = await this.provider.sendPrompt({
			agent: this,
		});

		const toolCallResponseMessage = await ToolCallManager.handleToolCalls({
			agent: this,
			responseMessage: modelResponseMessage,
		});

		const responseMessage = toolCallResponseMessage || modelResponseMessage;

		this.chatMessageManager.addAssistantMessage({
			text: responseMessage.text,
		});

		return responseMessage;
	}
}
