import {
	Type,
	SystemPrompt,
	type ISystemPromptParams,
} from '@sparrowstack/system-prompt';

export class SystemPromptFactory {
	public static create({
		systemPrompt,
	}: {
		systemPrompt: SystemPrompt | ISystemPromptParams;
	}): SystemPrompt {
		const isSystemPromptInstance =
			'type' in systemPrompt && systemPrompt.type === Type.SystemPrompt;

		return isSystemPromptInstance
			? systemPrompt
			: new SystemPrompt(systemPrompt);
	}
}
