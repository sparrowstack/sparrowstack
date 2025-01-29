import Anthropic from '@anthropic-ai/sdk';
import { BaseProvider } from '@Agent/core/providers/BaseProvider';
import { executeSendPrompt } from '@Agent/core/providers/AnthropicProvider/execute/executeSendPrompt';
import type { IConstructorParams } from '@Agent/core/providers/BaseProvider/common/interfaces';
import {
	toToolCallRequestMessage,
	toToolCallResponseMessages,
} from '@Agent/core/providers/AnthropicProvider/adapters';

export class AnthropicProvider extends BaseProvider {
	constructor({
		name,
		model,
		tools,
		apiKey,
		displayName,
		systemPrompt,
		chatMessageManager,
	}: IConstructorParams) {
		super({
			name,
			model,
			tools,
			apiKey,
			displayName,
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
			maxTokens: this.maxTokens,
			sdk: this.sdk as Anthropic,
			systemPrompt: this.systemPrompt,
			chatMessageManager: this.chatMessageManager,
		});
	}
}
