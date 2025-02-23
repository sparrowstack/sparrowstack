import { Role } from '@sparrowstack/core';
import { type Content } from '@google/generative-ai';

interface IParams {
	prompt: string;
}

export const toGoogleGenerativeAIPrompt = ({ prompt }: IParams) => {
	const systemInstruction: Content = {
		role: Role.System,
		parts: [
			{
				text: prompt,
			},
		],
	};

	return systemInstruction;
};
