import { GoogleGenerativeAI } from '@google/generative-ai';
import { SystemPrompt } from '@sparrowstack/system-prompt';

interface IParams {
	systemPrompt: SystemPrompt;
}

export const toSystemInsruction = ({ systemPrompt }: IParams) => {
	const systemInstruction = {
		parts: [
			{
				text: systemPrompt.getPrompt(),
			},
		],
	};

	return systemInstruction;
};
