import type OpenAI from 'openai';
import { BaseProvider } from '@core/providers/BaseProvider';
import { sendPrompt } from '@core/providers/OpenAIProvider/methods';
import type {
	SendPromptParams,
	ConstructorParams,
} from '@core/providers/BaseProvider/common/interfaces';
import {
	toToolCallRequestMessage,
	toToolCallResponseMessages,
} from '@core/providers/OpenAIProvider/common/adapters';
import type {
	OpenAIToolCallRequestMessages,
	OpenAIToolCallResponseMessages,
} from '@core/providers/OpenAIProvider/common/types';

export class OpenAIProvider extends BaseProvider<
	OpenAIToolCallRequestMessages,
	OpenAIToolCallResponseMessages
> {
	constructor({
		name,
		model,
		apiKey,
		settings,
		displayName,
		systemPrompt,
		toolRegistryManager,
		chatMessageManager,
		structuredOutputAgent,
	}: ConstructorParams) {
		super({
			name,
			model,
			apiKey,
			settings,
			displayName,
			systemPrompt,
			chatMessageManager,
			toolRegistryManager,
			structuredOutputAgent,
		});

		this.adapters = {
			toToolCallRequestMessage,
			toToolCallResponseMessages,
		};
	}

	public adapters: {
		toToolCallRequestMessage: typeof toToolCallRequestMessage;
		toToolCallResponseMessages: typeof toToolCallResponseMessages;
	};

	public sendPrompt({ structuredOutputSendMessage }: SendPromptParams = {}) {
		return sendPrompt({
			model: this.model,
			settings: this.settings,
			providerName: this.name,
			sdk: this.sdk as OpenAI,
			systemPrompt: this.systemPrompt,
			chatMessageManager: this.chatMessageManager,
			structuredOutputAgent: this.structuredOutputAgent,
			toolRegistryManager: this.toolRegistryManager,
			structuredOutputSendMessage: structuredOutputSendMessage,
		});
	}
}
