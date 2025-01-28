import { Provider } from '@Agent/common/enums';
import type { BaseLLM } from '@Agent/core/BaseLLM';
import { BaseProvider } from '@Agent/core/providers/BaseProvider';
import { sendPrompt } from '@Agent/core/providers/AnthropicProvider/execute';
import {
	toToolCallRequestMessage,
	toToolCallResponseMessages,
} from '@Agent/core/providers/AnthropicProvider/adapters';

interface IConstructorParams {
	model: string;
	apiKey: string;
	provider: Provider;
}

export class AnthropicProvider extends BaseProvider {
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

	public sendPrompt({ llm }: { llm: BaseLLM }) {
		return sendPrompt({ llm });
	}
}
