import { Role } from '@chat-message/common/enums';
import { type IChatMessage } from '@chat-message/common/interfaces';

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
