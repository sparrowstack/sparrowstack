import Anthropic from '@anthropic-ai/sdk';
import { BaseProvider } from '@Agent/core/providers/BaseProvider';
import { State } from '@Agent/core/providers/BaseProvider/common/enums';
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

	public sendPrompt({
		state,
	}: {
		state?: State;
	} = {}) {
		return executeSendPrompt({
			state,
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
