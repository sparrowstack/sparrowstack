import { Provider, AnthropicModel } from '../../common/enums';

export interface Message {
	role: 'user' | 'assistant' | 'system';
	content: string;
}

export interface IBaseLLM {
	maxTokens: number;
	provider: Provider;
	model: AnthropicModel;
	getHistory: () => Message[];
	clearHistory: () => void;
	sendMessage: ({ message }: { message: string }) => Promise<any>;
}
