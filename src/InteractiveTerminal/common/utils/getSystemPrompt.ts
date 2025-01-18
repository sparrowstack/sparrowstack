import { SystemPrompts } from '../../../Agent/core/SystemPrompts';

interface IOptions {
	systemPromptName: string;
}

export const getSystemPrompt = ({ systemPromptName }: IOptions) => {
	const systemPrompt = SystemPrompts[systemPromptName];

	if (!systemPrompt) {
		throw new Error(`System prompt ${systemPromptName} not found`);
	}

	return systemPrompt;
};
