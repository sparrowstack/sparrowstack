import { sendMessage } from '@agent/methods';
import { Logger } from '@sparrowstack/logger';
import { ProviderName } from '@sparrowstack/core';
import { ToolCallManager } from '@core/ToolCallManager';
import { ProviderFactory } from '@core/ProviderFactory';
import type { Settings } from '@agent/common/interfaces';
import { Tool, type ToolParams } from '@sparrowstack/tool';
import { InteractionLogger } from '@core/InteractionLogger';
import { defaultPrompt } from '@sparrowstack/system-prompts';
import { ToolRegistryManager } from '@core/ToolRegistryManager';
import { SystemPromptFactory } from '@core/SystemPromptFactory';
import { StructuredOutput } from '@sparrowstack/structured-output';
import { StructuredOutputFactory } from '@core/StucturedOutputFactory';
import { ChatMessageManager } from '@sparrowstack/chat-message-manager';
import type { Provider } from '@core/providers/BaseProvider/common/types';
import { getProviderDisplayName } from '@core/providers/BaseProvider/common/utils';
import type { ModelResponse } from '@core/providers/BaseProvider/common/interfaces';
import type { StructuredOutputCreateParams } from '@core/StucturedOutputFactory/common/interfaces';
import {
	SystemPrompt,
	type SystemPromptParams,
} from '@sparrowstack/system-prompt';

interface ConstructorParams {
	model: string;
	apiKey: string;
	settings?: Settings;
	provider: ProviderName;
	tools?: Tool[] | ToolParams[];
	systemPrompt?: SystemPrompt | SystemPromptParams;
	responseFormat?: StructuredOutputCreateParams['responseFormat'];
}

export class Agent {
	// Values
	readonly providerName: ProviderName;
	readonly providerDisplayName: string;

	// System Prompt
	readonly systemPrompt: SystemPrompt;

	// Structured Output
	readonly structuredOutputAgent?: StructuredOutput | undefined;

	// Tools
	readonly toolRegistryManager: ToolRegistryManager;

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
		responseFormat,
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

		// Structured Output
		// --------------------------------
		this.structuredOutputAgent = StructuredOutputFactory.create({
			responseFormat,
		});

		// Tools
		// --------------------------------
		this.toolRegistryManager = new ToolRegistryManager({ tools });

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
			toolRegistryManager: this.toolRegistryManager,
			chatMessageManager: this.chatMessageManager,
			structuredOutputAgent: this.structuredOutputAgent,
			providerDisplayName: this.providerDisplayName,
		});

		// Tool Calling
		// --------------------------------
		this.toolCallManager = new ToolCallManager({
			provider: this.provider,
			interactionLogger: this.interactionLogger,
			chatMessageManager: this.chatMessageManager,
			toolRegistryManager: this.toolRegistryManager,
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
		responseFormat: responseFormatParams,
	}: {
		message: string;
		responseFormat?: StructuredOutputCreateParams['responseFormat'];
	}): Promise<ModelResponse> {
		const structuredOutputSendMessage = StructuredOutputFactory.create({
			responseFormat: responseFormatParams,
		});

		return sendMessage({
			message,
			structuredOutputSendMessage,
			settings: this.settings,
			provider: this.provider,
			toolCallManager: this.toolCallManager,
			interactionLogger: this.interactionLogger,
			chatMessageManager: this.chatMessageManager,
		});
	}
}
