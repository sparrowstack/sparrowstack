import { GoogleGenerativeAI } from '@google/generative-ai';
import { BaseProvider } from '@core/providers/BaseProvider';
import { sendPrompt } from '@core/providers/GoogleGenerativeAIProvider/methods';
import type { GoogleGenerativeAIToolCallResponseMessages } from '@core/providers/GoogleGenerativeAIProvider/common/types';
import type { GoogleGenerativeAIToolCallRequestMessage } from '@core/providers/GoogleGenerativeAIProvider/common/interfaces';
import type {
	SendPromptParams,
	ConstructorParams,
} from '@core/providers/BaseProvider/common/interfaces';
import {
	toToolCallRequestMessage,
	toToolCallResponseMessages,
} from '@core/providers/GoogleGenerativeAIProvider/adapters';

export class GoogleGenerativeAIProvider extends BaseProvider<
	GoogleGenerativeAIToolCallRequestMessage,
	GoogleGenerativeAIToolCallResponseMessages
> {
	constructor({
		name,
		model,
		apiKey,
		settings,
		displayName,
		systemPrompt,
		toolRegistry,
		chatMessageManager,
	}: ConstructorParams) {
		super({
			name,
			model,
			apiKey,
			settings,
			displayName,
			systemPrompt,
			toolRegistry,
			chatMessageManager,
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

	public sendPrompt(params?: SendPromptParams) {
		return sendPrompt({
			model: this.model,
			state: params?.state,
			providerName: this.name,
			settings: this.settings,
			systemPrompt: this.systemPrompt,
			toolRegistry: this.toolRegistry,
			sdk: this.sdk as GoogleGenerativeAI,
			chatMessageManager: this.chatMessageManager,
		});
	}
}
