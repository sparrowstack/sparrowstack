import Anthropic from '@anthropic-ai/sdk';
import { BaseProvider } from '@core/providers/BaseProvider';
import { sendPrompt } from '@core/providers/AnthropicProvider/methods';
import type { IConstructorParams } from '@core/providers/BaseProvider/common/interfaces';
import {
	toToolCallRequestMessage,
	toToolCallResponseMessages,
} from '@core/providers/AnthropicProvider/adapters';

export class AnthropicProvider extends BaseProvider {
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
			sdk: this.sdk as Anthropic,
			systemPrompt: this.systemPrompt,
			toolRegistry: this.toolRegistry,
			chatMessageManager: this.chatMessageManager,
		});
	}
}
