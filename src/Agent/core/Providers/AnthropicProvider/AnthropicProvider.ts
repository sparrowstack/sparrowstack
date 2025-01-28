import {
	toToolCallRequestMessage,
	toToolCallResponseMessages,
} from '@Agent/core/Providers/AnthropicProvider/adapters';
import { sendPrompt } from '@Agent/core/Providers/AnthropicProvider/execute';

export class AnthropicProvider {
	public adapters = {
		toToolCallRequestMessage,
		toToolCallResponseMessages,
	};

	public execute = {
		sendPrompt,
	};
}
