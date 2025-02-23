import { Role } from '@sparrowstack/core';
import { type IChatMessage } from '@sparrowstack/core';

interface IParams {
	messages: IChatMessage[];
}

export const toChatHistory = ({ messages }: IParams) => {
	return messages.map((message) => {
		return {
			role: message.role === Role.User ? Role.User : 'model', // TODO: GooleGenerativeAI - Add model role
			parts: [{ text: message.content }],
		};
	});
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
