import { Role, ProviderName } from '@sparrowstack/core';
import { type IChatMessage } from '@chat-message/common/interfaces';

export class ChatMessage {
	readonly providerName: ProviderName;

	constructor({ providerName }: { providerName: ProviderName }) {
		this.providerName = providerName;
	}

	public createUserMessage({ content }: { content: string }): IChatMessage {
		// Adapt if Google Generative AI
		return {
			role: Role.User,
			content,
		};
	}

	public createModelMessage({ content }: { content: string }): IChatMessage {
		// Adapt if Google Generative AI
		const role =
			this.providerName === ProviderName.GoogleGenerativeAI
				? Role.Model
				: Role.Assistant;

		return {
			role,
			content,
		};
	}
}
