import { OpenAI } from 'openai';
import { Anthropic } from '@anthropic-ai/sdk';

import type { Tool } from '@Tool';
import { SystemPrompt } from '@SystemPrompt';
import { Role, Provider } from '@Agent/common/enums';
import type { IModelResponse } from '@Agent/common/interfaces';
import { ProviderSDKFactory } from '@Agent/core/ProviderSDKFactory';
import { ChatMessageManager } from '@Agent/core/ChatMessageManager';

interface IConstructorParams {
	model: string;
	tools: Tool[];
	apiKey: string;
	displayName: string;
	providerName: Provider;
	systemPrompt: SystemPrompt;
	chatMessageManager: ChatMessageManager;
}

export abstract class BaseProvider {
	// Base
	readonly model: string;
	readonly apiKey: string;
	readonly name: Provider;
	readonly displayName: string;

	// Utilities
	readonly tools: Tool[];
	readonly sdk: OpenAI | Anthropic;
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
		}: {
			responseMessage: IModelResponse;
		}) => {
			role: Role;
			content?:
				| OpenAI.Chat.Completions.ChatCompletionMessageToolCall[]
				| Anthropic.Messages.ToolUseBlock[];
			tool_calls?: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[];
		};

		toToolCallResponseMessages: ({
			toolCallResults,
		}: {
			toolCallResults: {
				id: string;
				result: unknown;
			}[];
		}) => // OpenAI
		| {
					role: string;
					tool_call_id: string;
					content: string;
			  }[]
			// Anthropic
			| {
					role: string;
					content: {
						type: string;
						tool_use_id: string;
						content: string;
					}[];
			  }[];
	};

	abstract sendPrompt(): Promise<IModelResponse>;
}
