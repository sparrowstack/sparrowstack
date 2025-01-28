import { Provider } from '@Agent/common/enums';
import type { Agent } from '@Agent';
import { BaseProvider } from '@Agent/core/providers/BaseProvider';
import { executeSendPrompt } from '@Agent/core/providers/AnthropicProvider/execute/executeSendPrompt';
import {
	toToolCallRequestMessage,
	toToolCallResponseMessages,
} from '@Agent/core/providers/AnthropicProvider/adapters';

interface IConstructorParams {
	model: string;
	apiKey: string;
	provider: Provider;
	displayName: string;
}

export class AnthropicProvider extends BaseProvider {
	constructor({ apiKey, provider, model, displayName }: IConstructorParams) {
		super({ apiKey, provider, model, displayName });

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
		return executeSendPrompt({ agent });
	}
}
