import { Logger } from '@sparrowstack/logger';
import { ToolRegistry } from '@sparrowstack/agent/src/core/ToolRegistry';
import { Tool, type IToolParams } from '@sparrowstack/tool';
import { defaultPrompt } from '@sparrowstack/system-prompts';
import { ToolCallManager } from '@sparrowstack/agent/src/core/ToolCallManager';
import { ProviderFactory } from '@sparrowstack/agent/src/core/ProviderFactory';
import { InteractionLogger } from '@sparrowstack/agent/src/core/InteractionLogger';
import { ChatMessageManager } from '@sparrowstack/agent/src/core/ChatMessageManager';
import { SystemPromptFactory } from '@sparrowstack/agent/src/core/SystemPromptFactory';
import { executeSendMessage } from '@sparrowstack/agent/src/agent/methods/executeSendMessage';
import type { AIProvider } from '@sparrowstack/agent/src/core/providers/BaseProvider/common/types';
import { getProviderDisplayName } from '@sparrowstack/agent/src/core/providers/BaseProvider/common/utils';
import type { IModelResponse } from '@sparrowstack/agent/src/core/providers/BaseProvider/common/interfaces';
import { ProviderName } from '@sparrowstack/agent/src/core/providers/BaseProvider/common/enums/ProviderName';
import {
	SystemPrompt,
	type ISystemPromptParams,
} from '@sparrowstack/system-prompt';

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
