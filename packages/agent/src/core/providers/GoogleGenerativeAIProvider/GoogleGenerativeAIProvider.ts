import { GoogleGenerativeAI } from '@google/generative-ai';
import { BaseProvider } from '@core/providers/BaseProvider';
import { sendPrompt } from '@core/providers/GoogleGenerativeAIProvider/methods';
import type { IConstructorParams } from '@core/providers/BaseProvider/common/interfaces';
import type {
	IToolCallRequestMessage,
	IToolCallResponseMessage,
} from '@core/providers/GoogleGenerativeAIProvider/common/interfaces';
import {
	toToolCallRequestMessage,
	toToolCallResponseMessages,
} from '@core/providers/GoogleGenerativeAIProvider/adapters';

export class GoogleGenerativeAIProvider extends BaseProvider<
	IToolCallRequestMessage,
	IToolCallResponseMessage
> {
	constructor({
		name,
		model,
		apiKey,
		displayName,
		systemPrompt,
		toolRegistry,
		chatMessageManager,
	}: IConstructorParams) {
		super({
			name,
			model,
			apiKey,
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

	public sendPrompt() {
		return sendPrompt({
			model: this.model,
			providerName: this.name,
			maxTokens: this.maxTokens,
			systemPrompt: this.systemPrompt,
			toolRegistry: this.toolRegistry,
			sdk: this.sdk as GoogleGenerativeAI,
			chatMessageManager: this.chatMessageManager,
		});
	}
}
