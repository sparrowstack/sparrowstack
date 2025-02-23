import { type IChatMessage, ChatMessage } from '@chat-message';

export class ChatMessageManager {
	protected chatMessages: IChatMessage[] = [];

	public addUserMessage({ text }: { text: string }): void {
		const message = ChatMessage.createUserMessage({ content: text });

		this.chatMessages.push(message);
	}

	public addAssistantMessage({ text }: { text: string }): void {
		const message = ChatMessage.createAssistantMessage({ content: text });

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
