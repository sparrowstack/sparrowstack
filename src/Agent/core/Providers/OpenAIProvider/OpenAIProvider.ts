import {
	toToolCallRequestMessage,
	toToolCallResponseMessages,
} from '@Agent/core/Providers/OpenAIProvider/adapters';
import { sendPrompt } from '@Agent/core/Providers/OpenAIProvider/execute';

export class OpenAIProvider {
	public adapters = {
		toToolCallRequestMessage,
		toToolCallResponseMessages,
	};

	public execute = {
		sendPrompt,
	};
}
