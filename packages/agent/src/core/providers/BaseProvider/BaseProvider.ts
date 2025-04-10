import { ProviderName } from '@sparrowstack/core';
import type { Settings } from '@agent/common/interfaces';
import { SystemPrompt } from '@sparrowstack/system-prompt';
import { ProviderSDKFactory } from '@core/ProviderSDKFactory';
import { ToolRegistryManager } from '@core/ToolRegistryManager';
import type { StructuredOutput } from '@sparrowstack/structured-output';
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
	readonly toolRegistryManager: ToolRegistryManager;

	// Utilities
	readonly sdk: ProviderSDK;
	readonly systemPrompt: SystemPrompt;
	readonly chatMessageManager: ChatMessageManager;

	// Settings
	readonly settings?: Settings;

	// Structured Output
	readonly structuredOutputAgent?: StructuredOutput;

	constructor({
		name,
		model,
		apiKey,
		settings,
		displayName,
		systemPrompt,
		chatMessageManager,
		toolRegistryManager,
		structuredOutputAgent,
	}: ConstructorParams) {
		// Base Properties
		// --------------------------------
		this.name = name; // e.g. 'openai'
		this.model = model; // e.g. 'gpt-4o'
		this.apiKey = apiKey;
		this.displayName = displayName; // e.g. 'OpenAI'

		// Tools
		// --------------------------------
		this.toolRegistryManager = toolRegistryManager;

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
		this.structuredOutputAgent = structuredOutputAgent;

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
		structuredOutputSendMessage,
	}: SendPromptParams): Promise<ModelResponse>;
}
