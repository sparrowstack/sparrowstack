import { Role } from '@system-prompt/common/enums/Role';
import { type Content } from '@google/generative-ai';

interface Params {
	prompt: string;
}

export const toGoogleGenerativeAPrompt = ({ prompt }: Params) => {
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
