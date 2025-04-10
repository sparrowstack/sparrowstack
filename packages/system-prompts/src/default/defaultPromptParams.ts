import type { SystemPromptParams } from '@sparrowstack/system-prompt';

export const defaultPromptParams: SystemPromptParams = {
	name: 'Default',
	description: 'A default system prompt.',
	prompt: {
		role: 'You are a helpful AI assistant.',
	},
};
