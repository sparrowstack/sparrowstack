import { Role } from '@Agent';
import { type IChatMessage } from '@Agent/core/ChatMessage/interfaces/IChatMessage';

export class ChatMessage {
	static createUserMessage({ content }: { content: string }): IChatMessage {
		return {
			role: Role.User,
			content,
		};
	}

	static createAssistantMessage({
		content,
	}: {
		content: string;
	}): IChatMessage {
		return {
			role: Role.Assistant,
			content,
		};
	}
}
