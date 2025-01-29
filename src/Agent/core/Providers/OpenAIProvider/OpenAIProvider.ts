import type OpenAI from 'openai';
import type { Tool } from '@Tool';
import { SystemPrompt } from '@SystemPrompt';
import { Provider } from '@Agent/common/enums';
import { BaseProvider } from '@Agent/core/providers/BaseProvider';
import { ChatMessageManager } from '@Agent/core/ChatMessageManager';
import { executeSendPrompt } from '@Agent/core/providers/OpenAIProvider/execute';
import {
	toToolCallRequestMessage,
	toToolCallResponseMessages,
} from '@Agent/core/providers/OpenAIProvider/adapters';

interface IConstructorParams {
	model: string;
	tools: Tool[];
	apiKey: string;
	displayName: string;
	providerName: Provider;
	systemPrompt: SystemPrompt;
	chatMessageManager: ChatMessageManager;
}

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
