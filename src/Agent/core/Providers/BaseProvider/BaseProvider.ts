import type { Tool } from '@Tool';
import { SystemPrompt } from '@SystemPrompt';
import { ProviderName } from '@Agent/common/enums';
import { ChatMessageManager } from '@Agent/core/ChatMessageManager';
import { ProviderSDKFactory } from '@Agent/core/ProviderSDKFactory';
import type { IModelResponse } from '@Agent/core/providers/BaseProvider/common/interfaces';
import type {
	IConstructorParams,
	IToToolCallRequestMessageParams,
	IToToolCallResponseMessagesParams,
} from '@Agent/core/providers/BaseProvider/common/interfaces';
import type {
	Sdk,
	ToolCallRequestMessage,
	ToolCallResponseMessages,
} from '@Agent/core/providers/BaseProvider/common/types';

export abstract class BaseProvider {
	// Base
	readonly model: string;
	readonly apiKey: string;
	readonly name: ProviderName;
	readonly displayName: string;

	// Utilities
	readonly sdk: Sdk;
	readonly tools: Tool[];
	readonly systemPrompt: SystemPrompt;
	readonly chatMessageManager: ChatMessageManager;

	// Settings
	readonly maxTokens: number;

	constructor({
		model,
		tools,
		apiKey,
		displayName,
		providerName,
		systemPrompt,
		chatMessageManager,
	}: IConstructorParams) {
		// Base Properties
		// --------------------------------
		this.model = model; // e.g. 'gpt-4o'
		this.apiKey = apiKey;
		this.name = providerName; // e.g. 'openai'
		this.displayName = displayName; // e.g. 'OpenAI'

		// Utilities
		// --------------------------------
		this.tools = tools;
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
