import { Provider } from '../../common/enums';
import { AgentLogger } from '../../../AgentLogger';
import type {
	IChatMessage,
	ILLMResponseMessage,
} from '../../common/interfaces';

export abstract class BaseLLM {
	protected messages: IChatMessage[] = [];
	abstract readonly model: string;
	abstract readonly maxTokens: number;
	abstract readonly provider: Provider;
	abstract readonly systemPrompt: string;
	abstract readonly logger: AgentLogger;

	constructor() {}

	public addToMessages({ message }: { message: IChatMessage }): void {
		this.messages.push(message);
	}

	public getMessages(): IChatMessage[] {
		return [...this.messages];
	}

	public clearMessages(): void {
		this.messages = [];
	}

	abstract sendMessage({
		message,
	}: {
		message: string;
	}): Promise<ILLMResponseMessage>;
}
