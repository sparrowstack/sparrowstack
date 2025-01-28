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
	// Provider
	readonly provider: OpenAIProvider | AnthropicProvider;

	// Tool Calling
	readonly tools?: Tool[];
	readonly functions?: Record<IToolParams['name'], IToolParams['function']>;

	// System Prompt
	readonly systemPrompt: SystemPrompt;

	// Utilities
	readonly logger: Logger;
	readonly interactionLogger: InteractionLogger;
	readonly chatMessageManager: ChatMessageManager;

	constructor({
		model,
		tools,
		apiKey,
		provider,
		systemPrompt = defaultPrompt,
	}: IConstructorParams) {
		// Provider
		// --------------------------------
		this.provider = ProviderFactory.create({
			model,
			apiKey,
			provider,
		});

		// System Prompt
		// --------------------------------
		this.systemPrompt = SystemPromptFactory.create({ systemPrompt });

		// Tool Calling
		// --------------------------------
		const toolsRegistry = ToolsFactory.create({ tools });

		this.tools = toolsRegistry?.tools;
		this.functions = toolsRegistry?.functions;

		// Utilities
		// --------------------------------
		this.logger = new Logger(this.provider.properName);
		this.chatMessageManager = new ChatMessageManager();
		this.interactionLogger = new InteractionLogger({
			logger: this.logger,
			systemPrompt: this.systemPrompt,
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
