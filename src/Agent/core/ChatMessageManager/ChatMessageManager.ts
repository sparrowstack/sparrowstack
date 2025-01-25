import { Role, Provider } from '@Agent';
import type { IChatMessage } from '@Agent/core/ChatMessage';

interface IConstructorParams {
	provider: Provider;
}

export class ChatMessageManager {
	readonly provider: Provider;
	protected chatMessages: IChatMessage[] = [];

	constructor({ provider }: IConstructorParams) {
		this.provider = provider;
	}

	public addUserMessage({ content }: { content: string }): void {
		this.chatMessages.push({ role: Role.User, content });
	}

	public addAssistantMessage({ content }: { content: string }): void {
		// if (Array.isArray(toolCalls) && toolCalls.length > 0) {
		// 	const content = [{ type: 'text', text: message }, ...toolCalls];
		this.chatMessages.push({ role: Role.Assistant, content });
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
