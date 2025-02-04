import type OpenAI from 'openai';
import { BaseProvider } from '@sparrow/core/providers/BaseProvider';
import { executeSendPrompt } from '@sparrow/core/providers/OpenAIProvider/execute';
import type { IConstructorParams } from '@sparrow/core/providers/BaseProvider/common/interfaces';
import {
	toToolCallRequestMessage,
	toToolCallResponseMessages,
} from '@sparrow/core/providers/OpenAIProvider/adapters';

export class OpenAIProvider extends BaseProvider {
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
			sdk: this.sdk as OpenAI,
			maxTokens: this.maxTokens,
			systemPrompt: this.systemPrompt,
			toolRegistry: this.toolRegistry,
			chatMessageManager: this.chatMessageManager,
		});
	}
}
