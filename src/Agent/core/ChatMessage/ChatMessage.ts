import { Role } from '@Agent';
import { type IChatMessage } from '@Agent/core/ChatMessage/interfaces/IChatMessage';

export class ChatMessage {
	static createUserMessage({
		content,
	}: {
		content: IChatMessage['content'];
	}): IChatMessage {
		return {
			role: Role.User,
			content,
		};
	}

	static createAssistantMessage({
		content,
	}: {
		content: IChatMessage['content'];
	}): IChatMessage {
		return {
			role: Role.Assistant,
			content,
		};
	}
}
