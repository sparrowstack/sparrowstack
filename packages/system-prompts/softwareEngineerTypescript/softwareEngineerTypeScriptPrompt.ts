import { SystemPrompt } from '@/packages/system-prompt';
import { softwareEngineerTypeScriptPromptParams } from '@/packages/system-prompts/softwareEngineerTypescript/softwareEngineerTypeScriptPromptParams';

export const softwareEngineerTypeScriptPrompt = new SystemPrompt(
	softwareEngineerTypeScriptPromptParams,
);
