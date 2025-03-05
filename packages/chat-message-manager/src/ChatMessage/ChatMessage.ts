import { Role, ProviderName } from '@sparrowstack/core';

export class ChatMessage {
	readonly providerName: ProviderName;

	constructor({ providerName }: { providerName: ProviderName }) {
		this.providerName = providerName;
	}

	public createUserMessage<MessageType>({
		text,
	}: {
		text: string;
	}): MessageType {
		let message: MessageType; 

		if (this.providerName === ProviderName.GoogleGenerativeAI) {
			message = {
				role: Role.User,
				parts: [{ text }],
			} as MessageType;
		} else {
			message = {
				role: Role.User,
				content: text,
			} as MessageType;
		}

		return message;
	}

	public createModelMessage<MessageType>({
		text,
	}: {
		text: string;
	}): MessageType {
		let message: MessageType;

		if (this.providerName === ProviderName.GoogleGenerativeAI) {
			message = {
				role: Role.Model,
				parts: [{ text }],
			} as MessageType;
		} else {
			message = {
				role: Role.Assistant,
				content: text,
			} as MessageType;
		}

		return message;
	}
}
