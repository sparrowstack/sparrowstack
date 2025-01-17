import type { LLMResponseMessage } from '../../common/types';
import { AnthropicModel, Provider } from '../../common/enums';
import type { IBaseLLM, IChatMessage } from '../../common/interfaces';

export abstract class BaseLLM implements IBaseLLM {
	protected messages: IChatMessage[] = [];
	abstract readonly maxTokens: number;
	abstract readonly provider: Provider;
	abstract readonly systemPrompt: string;
	abstract readonly model: AnthropicModel;

	constructor() {}

	protected addToMessages({ message }: { message: IChatMessage }): void {
		this.messages.push(message);
	}

	public clearMessages(): void {
		this.messages = [];
	}

	public getMessages(): IChatMessage[] {
		return [...this.messages];
	}

	abstract sendMessage({
		message,
	}: {
		message: string;
	}): Promise<LLMResponseMessage>;

	abstract getTextFromResponseMessage({
		responseMessage,
	}: {
		responseMessage: LLMResponseMessage;
	}): string;
}
