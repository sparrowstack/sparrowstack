import type OpenAI from 'openai';
import { BaseProvider } from '@Agent/core/providers/BaseProvider';
import { executeSendPrompt } from '@Agent/core/providers/OpenAIProvider/execute';
import type { IConstructorParams } from '@Agent/core/providers/BaseProvider/common/interfaces';
import {
	toToolCallRequestMessage,
	toToolCallResponseMessages,
} from '@Agent/core/providers/OpenAIProvider/adapters';

export class OpenAIProvider extends BaseProvider {
	constructor({
		model,
		tools,
		apiKey,
		displayName,
		providerName,
		systemPrompt,
		chatMessageManager,
	}: IConstructorParams) {
		super({
			model,
			tools,
			apiKey,
			displayName,
			providerName,
			systemPrompt,
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
			name: this.name,
			model: this.model,
			tools: this.tools,
			sdk: this.sdk as OpenAI,
			maxTokens: this.maxTokens,
			systemPrompt: this.systemPrompt,
			chatMessageManager: this.chatMessageManager,
		});
	}
}
