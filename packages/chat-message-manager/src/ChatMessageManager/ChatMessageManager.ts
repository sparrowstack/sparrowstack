import { ChatMessage } from '@chat-message';
import { ProviderName } from '@sparrowstack/core';

interface ConstructorParams {
	providerName: ProviderName;
}

export class ChatMessageManager {
	readonly providerName: ProviderName;
	protected chatMessage: ChatMessage;
	protected chatMessages: unknown[] = [];

	constructor({ providerName }: ConstructorParams) {
		this.providerName = providerName;
		this.chatMessage = new ChatMessage({ providerName });
	}

	public addUserMessage<MessageType>({ text }: { text: string }): void {
		const message = this.chatMessage.createUserMessage<MessageType>({
			text,
		});

		this.chatMessages.push(message);
	}

	public addModelMessage<MessageType>({ text }: { text: string }): void {
		const message = this.chatMessage.createModelMessage<MessageType>({
			text,
		});

		this.chatMessages.push(message);
	}

	// Typically used for adding custom tool call messages from the Provider
	public addToMessages<MessageType>({
		message,
	}: {
		message: MessageType;
	}): void {
		this.chatMessages.push(message);
	}

	public getMessages<MessageType>(): MessageType[] {
		return [...this.chatMessages] as MessageType[];
	}

	public clearMessages(): void {
		this.chatMessages = [];
	}
}
