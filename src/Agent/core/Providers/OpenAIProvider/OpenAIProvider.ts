import { Provider } from '@Agent/common/enums';
import type { Agent } from '@Agent';
import { BaseProvider } from '@Agent/core/providers/BaseProvider';
import { sendPrompt } from '@Agent/core/providers/OpenAIProvider/execute';
import {
	toToolCallRequestMessage,
	toToolCallResponseMessages,
} from '@Agent/core/providers/OpenAIProvider/adapters';

interface IConstructorParams {
	model: string;
	apiKey: string;
	provider: Provider;
}

export class OpenAIProvider extends BaseProvider {
	public adapters: {
		toToolCallRequestMessage: typeof toToolCallRequestMessage;
		toToolCallResponseMessages: typeof toToolCallResponseMessages;
	};

	constructor({ apiKey, provider, model }: IConstructorParams) {
		super({ apiKey, provider, model });

		this.adapters = {
			toToolCallRequestMessage,
			toToolCallResponseMessages,
		};
	}

	public sendPrompt({ agent }: { agent: Agent }) {
		return sendPrompt({ agent });
	}
}
