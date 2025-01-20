import { SystemPrompts } from '@Agent/core/SystemPrompts/SystemPrompts';

// Reverse mapping from prompt content to prompt name
export const SystemPromptName: Record<string, string> = Object.fromEntries(
	Object.entries(SystemPrompts).map(([key, value]) => [value, key]),
);
