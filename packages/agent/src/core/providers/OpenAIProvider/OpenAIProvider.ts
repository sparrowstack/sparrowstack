import type OpenAI from 'openai';
import { BaseProvider } from '@core/providers/BaseProvider';
import { sendPrompt } from '@core/providers/OpenAIProvider/methods';
import type { IConstructorParams } from '@core/providers/BaseProvider/common/interfaces';
import type {
	IToolCallResponseMessage,
	IToToolCallResponseMessagesParams,
} from '@core/providers/OpenAIProvider/common/interfaces';
import {
	toToolCallRequestMessage,
	toToolCallResponseMessages,
} from '@core/providers/OpenAIProvider/adapters';

export class OpenAIProvider extends BaseProvider<
	IToolCallResponseMessage,
	IToToolCallResponseMessagesParams
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
			sdk: this.sdk as OpenAI,
			maxTokens: this.maxTokens,
			systemPrompt: this.systemPrompt,
			toolRegistry: this.toolRegistry,
			chatMessageManager: this.chatMessageManager,
		});
	}
}
