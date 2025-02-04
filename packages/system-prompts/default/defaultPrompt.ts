import { SystemPrompt } from '@/packages/system-prompt';
import { defaultPromptParams } from '@/packages/system-prompts/default/defaultPromptParams';

export const defaultPrompt = new SystemPrompt(defaultPromptParams);
