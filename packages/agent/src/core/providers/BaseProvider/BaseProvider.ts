import { ProviderName } from '@sparrowstack/core';
import { ToolRegistry } from '@core/ToolRegistry';
import type { Settings } from '@agent/common/interfaces';
import { SystemPrompt } from '@sparrowstack/system-prompt';
import { ProviderSDKFactory } from '@core/ProviderSDKFactory';
import { ChatMessageManager } from '@sparrowstack/chat-message-manager';
import type { ProviderSDK } from '@core/ProviderSDKFactory/common/types';
import type { SendPromptParams } from '@core/providers/BaseProvider/common/interfaces';

import type {
	ModelResponse,
	ToolCallResults,
	ConstructorParams,
	ModelResponseMessage,
} from '@core/providers/BaseProvider/common/interfaces';

export abstract class BaseProvider<
	TToolCallRequestMessage = unknown,
	TToolCallResponseMessage = unknown,
> {
	// Base
	readonly model: string;
	readonly apiKey: string;
	readonly name: ProviderName;
	readonly displayName: string;

	// Tools
	readonly toolRegistry: ToolRegistry;

	// Utilities
	readonly sdk: ProviderSDK;
	readonly systemPrompt: SystemPrompt;
	readonly chatMessageManager: ChatMessageManager;

	// Settings
	readonly settings?: Settings;

	// Structured Output
	readonly responseFormatAgent: any;

	constructor({
		name,
		model,
		apiKey,
		settings,
		displayName,
		systemPrompt,
		toolRegistry,
		chatMessageManager,
		responseFormatAgent,
	}: ConstructorParams) {
		// Base Properties
		// --------------------------------
		this.name = name; // e.g. 'openai'
		this.model = model; // e.g. 'gpt-4o'
		this.apiKey = apiKey;
		this.displayName = displayName; // e.g. 'OpenAI'

		// Tools
		// --------------------------------
		this.toolRegistry = toolRegistry;

		// Utilities
		// --------------------------------
		this.systemPrompt = systemPrompt;
		this.chatMessageManager = chatMessageManager;
		this.sdk = ProviderSDKFactory.create({
			apiKey,
			providerName: this.name,
		});

		// Structured Output
		// --------------------------------
		this.responseFormatAgent = responseFormatAgent;

		// Settings
		// --------------------------------
		this.settings = settings;
	}

	abstract adapters: {
		toToolCallRequestMessage: (
			params: ModelResponseMessage,
		) => TToolCallRequestMessage;

		toToolCallResponseMessages: (
			params: ToolCallResults,
		) => TToolCallResponseMessage;
	};

	abstract sendPrompt({
		responseFormatSendMessage,
	}: SendPromptParams): Promise<ModelResponse>;
}
