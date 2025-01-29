import { Role } from '@Agent/core/ChatMessage/common/enums/Role';
import { type IChatMessage } from '@Agent/core/ChatMessage/common/interfaces/IChatMessage';

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
