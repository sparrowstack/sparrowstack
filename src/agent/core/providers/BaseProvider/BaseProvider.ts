import { SystemPrompt } from '@system-prompt';
import { ToolRegistry } from '@agent/core/ToolRegistry';
import { ChatMessageManager } from '@agent/core/ChatMessageManager';
import { ProviderSDKFactory } from '@agent/core/ProviderSDKFactory';
import { ProviderName } from '@agent/core/providers/BaseProvider/common/enums';
import type { IModelResponse } from '@agent/core/providers/BaseProvider/common/interfaces';
import type {
	IConstructorParams,
	IToToolCallRequestMessageParams,
	IToToolCallResponseMessagesParams,
} from '@agent/core/providers/BaseProvider/common/interfaces';
import type {
	Sdk,
	ToolCallRequestMessage,
	ToolCallResponseMessages,
} from '@agent/core/providers/BaseProvider/common/types';

export abstract class BaseProvider {
	// Base
	readonly model: string;
	readonly apiKey: string;
	readonly name: ProviderName;
	readonly displayName: string;

	// Tools
	readonly toolRegistry: ToolRegistry;

	// Utilities
	readonly sdk: Sdk;
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
		this.maxTokens = 1024;
	}

	abstract adapters: {
		toToolCallRequestMessage: ({
			responseMessage,
		}: IToToolCallRequestMessageParams) => ToolCallRequestMessage;

		toToolCallResponseMessages: ({
			toolCallResults,
		}: IToToolCallResponseMessagesParams) => ToolCallResponseMessages;
	};

	abstract sendPrompt(): Promise<IModelResponse>;
}
