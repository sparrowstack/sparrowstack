import { Role } from '@sparrowstack/core';
import { type Content } from '@google/generative-ai';
import { type IChatMessage } from '@sparrowstack/chat-message-manager';

interface IParams {
	messages: IChatMessage[];
}

export const toChatHistory = ({ messages }: IParams) => {
	const chatHistory: Content[] = messages.map((message) => ({
		role: message.role === Role.User ? Role.User : 'model',
		parts: [{ text: message.content as string }],
	}));

	return chatHistory;
};

/**
Gemini: Chat History Example

const chat = model.startChat({
	history: [
		{
			role: 'user',
			parts: [{ text: 'Hello' }],
		},
		{
			role: 'model',
			parts: [
				{ text: 'Great to meet you. What would you like to know?' },
			],
		},
	],
});
 */
