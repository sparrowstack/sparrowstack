import type OpenAI from 'openai';
import { BaseProvider } from '@core/providers/BaseProvider';
import { sendPrompt } from '@core/providers/OpenAIProvider/methods';
import {
	toToolCallRequestMessage,
	toToolCallResponseMessages,
} from '@core/providers/OpenAIProvider/adapters';
import type {
	ConstructorParams,
	SendPromptParams,
} from '@core/providers/BaseProvider/common/interfaces';
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

	public sendPrompt(params?: SendPromptParams) {
		return sendPrompt({
			model: this.model,
			state: params?.state,
			settings: this.settings,
			providerName: this.name,
			sdk: this.sdk as OpenAI,
			systemPrompt: this.systemPrompt,
			toolRegistry: this.toolRegistry,
			chatMessageManager: this.chatMessageManager,
		});
	}
}
