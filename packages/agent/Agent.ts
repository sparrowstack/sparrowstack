import { Logger } from '@/packages/logger';
import { Tool, type IToolParams } from '@/packages/tool';
import { defaultPrompt } from '@/packages/system-prompts/default';
import { ToolRegistry } from '@/packages/agent/core/ToolRegistry';
import { ToolCallManager } from '@/packages/agent/core/ToolCallManager';
import { ProviderFactory } from '@/packages/agent/core/ProviderFactory';
import { InteractionLogger } from '@/packages/agent/core/InteractionLogger';
import { ChatMessageManager } from '@/packages/agent/core/ChatMessageManager';
import { SystemPromptFactory } from '@/packages/agent/core/SystemPromptFactory';
import { executeSendMessage } from '@/packages/agent/execute/executeSendMessage';
import {
	SystemPrompt,
	type ISystemPromptParams,
} from '@/packages/system-prompt';
import type { AIProvider } from '@/packages/agent/core/providers/BaseProvider/common/types';
import { getProviderDisplayName } from '@/packages/agent/core/providers/BaseProvider/common/utils';
import type { IModelResponse } from '@/packages/agent/core/providers/BaseProvider/common/interfaces';
import { ProviderName } from '@/packages/agent/core/providers/BaseProvider/common/enums/ProviderName';

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
