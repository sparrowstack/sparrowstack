import type { IChatMessage } from './IChatMessage';
import { Provider, AnthropicModel } from '../../common/enums';
import type { LLMResponseMessage } from '../../common/types';

// TODO: Fix Typings for messages, no 'any'etc..
export interface IBaseLLM {
	//Properties
	maxTokens: number;
	provider: Provider;
	model: AnthropicModel;
	systemPrompt: string;

	//Methods
	clearMessages: () => void;

	getMessages: () => IChatMessage[];

	sendMessage: ({
		message,
	}: {
		message: string;
	}) => Promise<LLMResponseMessage>;
	getTextFromResponseMessage({
		responseMessage,
	}: {
		responseMessage: LLMResponseMessage;
	}): string;
}
