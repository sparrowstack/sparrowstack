import { Role } from '@sparrowstack/core';
import { type Content } from '@google/generative-ai';
import { SystemPrompt } from '@sparrowstack/system-prompt';

interface IParams {
	systemPrompt: SystemPrompt;
}

export const toSystemInsruction = ({ systemPrompt }: IParams) => {
	const systemInstruction: Content = {
		role: Role.System,
		parts: [
			{
				text: systemPrompt.getPrompt(),
			},
		],
	};

	return systemInstruction;
};
