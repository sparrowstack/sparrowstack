import type { Agent } from '@Agent';
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
	apiKey: string;
	provider: Provider;
	displayName: string;
	chatMessageManager: ChatMessageManager;
}

export class OpenAIProvider extends BaseProvider {
	constructor({
		apiKey,
		provider,
		model,
		displayName,
		chatMessageManager,
	}: IConstructorParams) {
		super({ apiKey, provider, model, displayName, chatMessageManager });

		this.adapters = {
			toToolCallRequestMessage,
			toToolCallResponseMessages,
		};
	}

	public adapters: {
		toToolCallRequestMessage: typeof toToolCallRequestMessage;
		toToolCallResponseMessages: typeof toToolCallResponseMessages;
	};

	public sendPrompt({ agent }: { agent: Agent }) {
		return executeSendPrompt({
			agent,
			chatMessageManager: this.chatMessageManager,
		});
	}
}
