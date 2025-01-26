import { Role } from '@Agent';
import { type IChatMessage } from '@Agent/core/ChatMessageFactory/interfaces/IChatMessage';

export class ChatMessageFactory {
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
			content,
			role: Role.Assistant,
		};
	}

	static createSystemMessage({ content }: { content: string }): IChatMessage {
		return {
			content,
			role: Role.System,
		};
	}
}
