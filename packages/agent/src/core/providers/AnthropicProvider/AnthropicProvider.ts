import Anthropic from '@anthropic-ai/sdk';
import { BaseProvider } from '@core/providers/BaseProvider';
import { sendPrompt } from '@core/providers/AnthropicProvider/methods';
import {
	toToolCallRequestMessage,
	toToolCallResponseMessages,
} from '@core/providers/AnthropicProvider/common/adapters';
import type {
	ConstructorParams,
} from '@core/providers/BaseProvider/common/interfaces';
import type {
	AnthropicToolCallResponseMessage,
	AnthropicToolCallRequestMessage,
} from '@core/providers/AnthropicProvider/common/interfaces';

export class AnthropicProvider extends BaseProvider<
	AnthropicToolCallRequestMessage,
	AnthropicToolCallResponseMessage[]
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
			settings: this.settings,
			providerName: this.name,
			sdk: this.sdk as Anthropic,
			systemPrompt: this.systemPrompt,
			toolRegistry: this.toolRegistry,
			structuredOutput: this.structuredOutput,
			chatMessageManager: this.chatMessageManager,
		});
	}
}
