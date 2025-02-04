import { SystemPrompt, type ISystemPromptParams } from '@system-prompt';

export class SystemPromptFactory {
	public static create({
		systemPrompt,
	}: {
		systemPrompt: SystemPrompt | ISystemPromptParams;
	}): SystemPrompt {
		return systemPrompt instanceof SystemPrompt
			? systemPrompt
			: new SystemPrompt(systemPrompt);
	}
}
