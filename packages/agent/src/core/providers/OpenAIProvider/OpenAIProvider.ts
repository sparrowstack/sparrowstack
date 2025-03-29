import type OpenAI from 'openai';
import { BaseProvider } from '@core/providers/BaseProvider';
import { sendPrompt } from '@core/providers/OpenAIProvider/methods';
import type { ConstructorParams } from '@core/providers/BaseProvider/common/interfaces';
import {
	toToolCallRequestMessage,
	toToolCallResponseMessages,
} from '@core/providers/OpenAIProvider/common/adapters';
import type {
	OpenAIToolCallRequestMessage,
	OpenAIToolCallResponseMessage,
} from '@core/providers/OpenAIProvider/common/interfaces';

export class OpenAIProvider extends BaseProvider<
	OpenAIToolCallRequestMessage,
	OpenAIToolCallResponseMessage[]
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
			sdk: this.sdk as OpenAI,
			systemPrompt: this.systemPrompt,
			toolRegistry: this.toolRegistry,
			structuredOutput: this.structuredOutput,
			chatMessageManager: this.chatMessageManager,
		});
	}
}
