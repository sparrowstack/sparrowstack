import { ProviderName } from '@sparrowstack/core';
import { ToolRegistry } from '@core/ToolRegistry';
import { SystemPrompt } from '@sparrowstack/system-prompt';
import { ProviderSDKFactory } from '@core/ProviderSDKFactory';
import type { ProviderSDK } from '@core/ProviderSDKFactory/common/types';
import { ChatMessageManager } from '@sparrowstack/chat-message-manager';
import type { IModelResponse } from '@core/providers/BaseProvider/common/interfaces';
import type {
	IConstructorParams,
	IToToolCallRequestMessageParams,
} from '@core/providers/BaseProvider/common/interfaces';
import type { ToolCallRequestMessage } from '@core/providers/BaseProvider/common/types';

export abstract class BaseProvider<
	TToolCallResponseMessage = unknown,
	TToolCallResponseMessagesParams = unknown,
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
	readonly maxTokens: number;

	constructor({
		name,
		model,
		apiKey,
		displayName,
		systemPrompt,
		toolRegistry,
		chatMessageManager,
	}: IConstructorParams) {
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

		// Settings
		// --------------------------------
		this.maxTokens = 4096;
	}

	abstract adapters: {
		toToolCallRequestMessage: (
			params: IToToolCallRequestMessageParams,
		) => ToolCallRequestMessage;

		toToolCallResponseMessages: (
			params: TToolCallResponseMessagesParams,
		) => TToolCallResponseMessage;
	};

	abstract sendPrompt(): Promise<IModelResponse>;
}
