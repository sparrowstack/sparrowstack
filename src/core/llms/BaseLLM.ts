import { AnthropicModel, Provider } from '../../common/enums';
import type { IBaseLLM } from '../../common/interfaces';

export interface Message {
	role: 'user' | 'assistant' | 'system';
	content: string;
}

export abstract class BaseLLM implements IBaseLLM {
	protected messageHistory: Message[] = [];
	abstract readonly provider: Provider;
	abstract readonly model: AnthropicModel;
	abstract readonly maxTokens: number;

	constructor() {}

	protected addToHistory(message: Message): void {
		this.messageHistory.push(message);
	}

	public clearHistory(): void {
		this.messageHistory = [];
	}

	public getHistory(): Message[] {
		return [...this.messageHistory];
	}

	abstract sendMessage({ message }: { message: string }): Promise<any>;
}
