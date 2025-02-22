import { GoogleGenerativeAI } from '@google/generative-ai';
import { BaseProvider } from '@core/providers/BaseProvider';
import { executeSendPrompt } from '@core/providers/GoogleGenerativeAIProvider/execute/executeSendPrompt';
import type { IConstructorParams } from '@core/providers/BaseProvider/common/interfaces';
import {
	toToolCallRequestMessage,
	toToolCallResponseMessages,
} from '@core/providers/GoogleGenerativeAIProvider/adapters';

export class GoogleGenerativeAIProvider extends BaseProvider {
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
		return executeSendPrompt({
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
