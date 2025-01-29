import { ProviderName } from '@Agent';
import { Logger } from '@Logger';
import { Tool, type IToolParams } from '@Tool';
import { defaultPrompt } from '@SystemPrompts/default';
import { ToolsFactory } from '@Agent/core/ToolsFactory';
import { ToolCallManager } from '@Agent/core/ToolCallManager';
import { ProviderFactory } from '@Agent/core/ProviderFactory';
import { InteractionLogger } from '@Agent/core/InteractionLogger';
import { ChatMessageManager } from '@Agent/core/ChatMessageManager';
import { SystemPromptFactory } from '@Agent/core/SystemPromptFactory';
import { executeSendMessage } from '@Agent/execute/executeSendMessage';
import { OpenAIProvider } from '@Agent/core/providers/OpenAIProvider';
import { SystemPrompt, type ISystemPromptParams } from '@SystemPrompt';
import { AnthropicProvider } from '@Agent/core/providers/AnthropicProvider';
import { getProviderDisplayName } from '@Agent/core/providers/BaseProvider/common/utils';
import type { IModelResponse } from '@Agent/core/providers/BaseProvider/common/interfaces';

interface IConstructorParams {
	model: string;
	apiKey: string;
	provider: ProviderName;
	tools?: Tool[] | IToolParams[];
	systemPrompt?: SystemPrompt | ISystemPromptParams;
}

export class Agent {
	// Values
	readonly providerName: ProviderName;
	readonly providerDisplayName: string;

	// System Prompt
	readonly systemPrompt: SystemPrompt;

	// Tools
	readonly tools?: Tool[];
	readonly functions?: Record<IToolParams['name'], IToolParams['function']>;

	// Utilities
	readonly logger: Logger;
	readonly interactionLogger: InteractionLogger;
	readonly chatMessageManager: ChatMessageManager;

	// Provider
	// TODO: Provider Type
	readonly provider: OpenAIProvider | AnthropicProvider;

	// Tool Calling
	readonly toolCallManager: ToolCallManager;

	constructor({
		model,
		tools,
		apiKey,
		provider,
		systemPrompt = defaultPrompt,
	}: IConstructorParams) {
		// Values
		// --------------------------------
		this.providerName = provider;
		this.providerDisplayName = getProviderDisplayName({ provider });

		// System Prompt
		// --------------------------------
		this.systemPrompt = SystemPromptFactory.create({
			systemPrompt,
		});

		// Tools
		// --------------------------------
		const toolsRegistry = ToolsFactory.create({ tools });
		this.tools = toolsRegistry.tools;
		this.functions = toolsRegistry.functions;

		// Utilities
		// --------------------------------
		this.chatMessageManager = new ChatMessageManager();
		this.logger = new Logger({ context: this.providerDisplayName });
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
			tools: this.tools,
			systemPrompt: this.systemPrompt,
			providerName: this.providerName,
			displayName: this.providerDisplayName,
			chatMessageManager: this.chatMessageManager,
		});

		// Tool Calling
		// --------------------------------
		this.toolCallManager = new ToolCallManager({
			provider: this.provider,
			functions: this.functions,
			interactionLogger: this.interactionLogger,
			chatMessageManager: this.chatMessageManager,
		});
	}

	public async sendMessage({
		message,
	}: {
		message: string;
	}): Promise<IModelResponse> {
		return executeSendMessage({
			message,
			provider: this.provider,
			toolCallManager: this.toolCallManager,
			interactionLogger: this.interactionLogger,
			chatMessageManager: this.chatMessageManager,
		});
	}
}
