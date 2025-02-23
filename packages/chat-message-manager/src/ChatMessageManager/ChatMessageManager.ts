import { type IChatMessage, ChatMessage } from '@chat-message';
import { ProviderName } from '@sparrowstack/core';

interface IConstructorParams {
	providerName: ProviderName;
}

export class ChatMessageManager {
	readonly providerName: ProviderName;
	protected chatMessage: ChatMessage;
	protected chatMessages: IChatMessage[] = [];

	constructor({ providerName }: IConstructorParams) {
		this.providerName = providerName;
		this.chatMessage = new ChatMessage({ providerName });
	}

	public addUserMessage({ text }: { text: string }): void {
		const message = this.chatMessage.createUserMessage({ content: text });

		this.chatMessages.push(message);
	}

	public addModelMessage({ text }: { text: string }): void {
		const message = this.chatMessage.createModelMessage({
			content: text,
		});

		this.chatMessages.push(message);
	}

	// Typically used for adding custom tool call messages from the Provider
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
