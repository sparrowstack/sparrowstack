import { Logger } from '@logger';
import { Tool, type IToolParams } from '@tool';
import { defaultPrompt } from '@system-prompts/default';
import { ToolRegistry } from '@sparrow/core/ToolRegistry';
import { ToolCallManager } from '@sparrow/core/ToolCallManager';
import { ProviderFactory } from '@sparrow/core/ProviderFactory';
import { InteractionLogger } from '@sparrow/core/InteractionLogger';
import { ChatMessageManager } from '@sparrow/core/ChatMessageManager';
import { SystemPromptFactory } from '@sparrow/core/SystemPromptFactory';
import { executeSendMessage } from '@sparrow/execute/executeSendMessage';
import { SystemPrompt, type ISystemPromptParams } from '@system-prompt';
import type { AIProvider } from '@sparrow/core/providers/BaseProvider/common/types';
import { getProviderDisplayName } from '@sparrow/core/providers/BaseProvider/common/utils';
import type { IModelResponse } from '@sparrow/core/providers/BaseProvider/common/interfaces';
import { ProviderName } from '@sparrow/core/providers/BaseProvider/common/enums/ProviderName';

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
	readonly toolRegistry: ToolRegistry;

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
		this.toolRegistry = new ToolRegistry({ tools });

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
			systemPrompt: this.systemPrompt,
			providerName: this.providerName,
			toolRegistry: this.toolRegistry,
			chatMessageManager: this.chatMessageManager,
			providerDisplayName: this.providerDisplayName,
		});

		// Tool Calling
		// --------------------------------
		this.toolCallManager = new ToolCallManager({
			provider: this.provider,
			toolRegistry: this.toolRegistry,
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
