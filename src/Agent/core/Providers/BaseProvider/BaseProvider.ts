import { OpenAI } from 'openai';
import { Anthropic } from '@anthropic-ai/sdk';

import type { Agent } from '@Agent';
import { Role, Provider } from '@Agent/common/enums';
import type { IModelResponse } from '@Agent/common/interfaces';
import { ProviderSDKFactory } from '@Agent/core/ProviderSDKFactory';
import { ChatMessageManager } from '@Agent/core/ChatMessageManager';

interface IConstructorParams {
	model: string;
	apiKey: string;
	provider: Provider;
	displayName: string;
	chatMessageManager: ChatMessageManager;
}

export abstract class BaseProvider {
	// Base
	readonly model: string;
	readonly apiKey: string;
	readonly name: Provider;
	readonly displayName: string;
	readonly sdk: OpenAI | Anthropic;
	readonly chatMessageManager: ChatMessageManager;

	// Settings
	readonly maxTokens: number;

	constructor({
		apiKey,
		provider,
		model,
		displayName,
		chatMessageManager,
	}: IConstructorParams) {
		this.sdk = ProviderSDKFactory.create({
			apiKey,
			provider,
		});

		// Base Properties
		// --------------------------------
		this.model = model; // e.g. 'gpt-4o'
		this.apiKey = apiKey;
		this.name = provider; // e.g. 'openai'
		this.displayName = displayName; // e.g. 'OpenAI'
		this.chatMessageManager = chatMessageManager;
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

	abstract sendPrompt({ agent }: { agent: Agent }): Promise<IModelResponse>;
}
