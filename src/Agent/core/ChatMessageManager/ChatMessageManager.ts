import { Provider } from '@Agent';
import {
	type IChatMessage,
	ChatMessageFactory,
} from '@Agent/core/ChatMessageFactory';

interface IConstructorParams {
	// ChatMessageFactory might need Provider to adapt the message
	// Keep around for now
	provider: Provider;
}

export class ChatMessageManager {
	readonly provider: Provider;
	protected chatMessages: IChatMessage[] = [];

	constructor({ provider }: IConstructorParams) {
		this.provider = provider;
	}

	public addUserMessage({ content }: { content: string }): void {
		const message = ChatMessageFactory.createUserMessage({ content });

		this.chatMessages.push(message);
	}

	public addAssistantMessage({ content }: { content: string }): void {
		// if (Array.isArray(toolCalls) && toolCalls.length > 0) {
		// 	const content = [{ type: 'text', text: message }, ...toolCalls];
		const message = ChatMessageFactory.createAssistantMessage({ content });

		this.chatMessages.push(message);
	}

	public addSystemMessage({ content }: { content: string }): void {
		const message = ChatMessageFactory.createSystemMessage({ content });

		this.chatMessages.push(message);
	}

	public addToMessages({ message }: { message: IChatMessage }): void {
		this.chatMessages.push(message);
	}

	public getMessages(): IChatMessage[] {
		return [...this.chatMessages];
	}

	public clearMessages(): void {
		this.chatMessages = [];
	}
}
