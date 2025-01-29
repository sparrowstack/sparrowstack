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
import { SystemPrompt, type ISystemPromptParams } from '@SystemPrompt';
import type { ToolFunctions } from '@Agent/core/ToolCallManager/common/types';
import type { AIProvider } from '@Agent/core/providers/BaseProvider/common/types';
import { getProviderDisplayName } from '@Agent/core/providers/BaseProvider/common/utils';
import type { IModelResponse } from '@Agent/core/providers/BaseProvider/common/interfaces';
import { ProviderName } from '@Agent/core/providers/BaseProvider/common/enums/ProviderName';

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
	readonly functions?: ToolFunctions;

	// Utilities
	readonly logger: Logger;
	readonly interactionLogger: InteractionLogger;
	readonly chatMessageManager: ChatMessageManager;

	// Provider
	readonly provider: AIProvider;

	// Tool Calling
	readonly toolCallManager: ToolCallManager;

	constructor({
		model,
		tools,
		apiKey,
		provider: providerName,
		systemPrompt = defaultPrompt,
	}: IConstructorParams) {
		// Values
		// --------------------------------
		this.providerName = providerName;
		this.providerDisplayName = getProviderDisplayName({ providerName });

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
			providerDisplayName: this.providerDisplayName,
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
