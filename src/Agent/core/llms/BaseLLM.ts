import { AgentLogger } from '@AgentLogger';
import { Provider } from '@Agent/common/enums';
import type { ITool, IToolCalls } from '@Agent/core/Tools/common/interfaces';
import type {
	IChatMessage,
	ILLMResponseMessage,
} from '@Agent/common/interfaces';

export abstract class BaseLLM {
	protected messages: IChatMessage[] = [];
	abstract readonly model: string;
	abstract readonly maxTokens: number;
	abstract readonly provider: Provider;
	abstract readonly providerName: string;
	abstract readonly systemPrompt: string;
	abstract readonly systemPromptName: string;
	abstract readonly logger: AgentLogger;
	abstract readonly tools?: ITool[];
	abstract readonly toolCalls?: IToolCalls;

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
