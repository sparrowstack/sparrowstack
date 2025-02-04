import Anthropic from '@anthropic-ai/sdk';
import { BaseProvider } from '@/packages/agent/core/providers/BaseProvider';
import { executeSendPrompt } from '@/packages/agent/core/providers/AnthropicProvider/execute/executeSendPrompt';
import type { IConstructorParams } from '@/packages/agent/core/providers/BaseProvider/common/interfaces';
import {
	toToolCallRequestMessage,
	toToolCallResponseMessages,
} from '@/packages/agent/core/providers/AnthropicProvider/adapters';

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
		return executeSendPrompt({
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
