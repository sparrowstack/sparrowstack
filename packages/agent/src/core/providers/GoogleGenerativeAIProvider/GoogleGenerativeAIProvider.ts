import { GoogleGenerativeAI } from '@google/generative-ai';
import { BaseProvider } from '@core/providers/BaseProvider';
import { sendPrompt } from '@core/providers/GoogleGenerativeAIProvider/methods';
import type { ConstructorParams } from '@core/providers/BaseProvider/common/interfaces';
import type { GoogleGenerativeAIToolCallResponseMessages } from '@core/providers/GoogleGenerativeAIProvider/common/types';
import type { GoogleGenerativeAIToolCallRequestMessage } from '@core/providers/GoogleGenerativeAIProvider/common/interfaces';
import {
	toToolCallRequestMessage,
	toToolCallResponseMessages,
} from '@core/providers/GoogleGenerativeAIProvider/common/adapters';

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
		structuredOutput,
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
			structuredOutput,
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
			settings: this.settings,
			systemPrompt: this.systemPrompt,
			toolRegistry: this.toolRegistry,
			sdk: this.sdk as GoogleGenerativeAI,
			structuredOutput: this.structuredOutput,
			chatMessageManager: this.chatMessageManager,
		});
	}
}
