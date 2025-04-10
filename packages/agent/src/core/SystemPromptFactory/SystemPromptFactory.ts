import {
	Type,
	SystemPrompt,
	type SystemPromptParams,
} from '@sparrowstack/system-prompt';

export class SystemPromptFactory {
	public static create({
		systemPrompt,
	}: {
		systemPrompt: SystemPrompt | SystemPromptParams;
	}): SystemPrompt {
		const isSystemPromptInstance =
			'type' in systemPrompt && systemPrompt.type === Type.SystemPrompt;

		return isSystemPromptInstance
			? systemPrompt
			: new SystemPrompt(systemPrompt);
	}
}
