import { sendMessage } from '@agent/methods';
import { Logger } from '@sparrowstack/logger';
import { ToolRegistry } from '@core/ToolRegistry';
import { ProviderName } from '@sparrowstack/core';
import { ToolCallManager } from '@core/ToolCallManager';
import { ProviderFactory } from '@core/ProviderFactory';
import type { Settings } from '@agent/common/interfaces';
import { InteractionLogger } from '@core/InteractionLogger';
import { Tool, type IToolParams } from '@sparrowstack/tool';
import { defaultPrompt } from '@sparrowstack/system-prompts';
import { SystemPromptFactory } from '@core/SystemPromptFactory';
import { ChatMessageManager } from '@sparrowstack/chat-message-manager';
import type { Provider } from '@core/providers/BaseProvider/common/types';
import { getProviderDisplayName } from '@core/providers/BaseProvider/common/utils';
import type { ModelResponse } from '@core/providers/BaseProvider/common/interfaces';
import {
	SystemPrompt,
	type ISystemPromptParams,
} from '@sparrowstack/system-prompt';

interface ConstructorParams {
	model: string;
	apiKey: string;
	settings?: Settings;
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
	readonly provider: Provider;

	// Tool Calling
	readonly toolCallManager: ToolCallManager;

	// Settings
	readonly settings?: Settings;

	constructor({
		model,
		tools,
		apiKey,
		settings,
		provider: providerName,
		systemPrompt = defaultPrompt,
	}: ConstructorParams) {
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

		// Chat Message Manager
		// --------------------------------
		this.chatMessageManager = new ChatMessageManager({ providerName });

		// Utilities
		// --------------------------------
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
			settings: this.settings,
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

		// Settings
		// --------------------------------
		this.settings = settings;
	}

	public setRequestPermissionHandler(
		handler: ({ message }: { message: string }) => Promise<boolean>,
	) {
		this.toolCallManager.setRequestPermissionHandler(handler);
	}

	public async sendMessage({
		message,
	}: {
		message: string;
	}): Promise<ModelResponse> {
		return sendMessage({
			message,
			settings: this.settings,
			provider: this.provider,
			toolCallManager: this.toolCallManager,
			interactionLogger: this.interactionLogger,
			chatMessageManager: this.chatMessageManager,
		});
	}
}
