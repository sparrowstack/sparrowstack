import type { ISystemPromptParams } from '@SystemPrompt';

export const defaultPromptParams: ISystemPromptParams = {
	meta: {
		name: 'Default',
		description: 'A default system prompt.',
	},
	prompt: {
		role: 'You are a helpful AI assistant.',
	},
};
