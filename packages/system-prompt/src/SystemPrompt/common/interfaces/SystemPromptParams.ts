import type { Prompt } from '@system-prompt/common/interfaces';

export interface SystemPromptParams {
	name: string;
	prompt: Prompt;
	createdBy?: string;
	description: string;
}
