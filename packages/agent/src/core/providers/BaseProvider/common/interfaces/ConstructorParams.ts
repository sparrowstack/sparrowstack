import { ProviderName } from '@sparrowstack/core';
import type { Settings } from '@agent/common/interfaces';
import { SystemPrompt } from '@sparrowstack/system-prompt';
import { ToolRegistryManager } from '@core/ToolRegistryManager';
import { ChatMessageManager } from '@sparrowstack/chat-message-manager';
import type { StructuredOutput } from '@sparrowstack/structured-output';

export interface ConstructorParams {
	model: string;
	apiKey: string;
	name: ProviderName;
	displayName: string;
	settings?: Settings;
	systemPrompt: SystemPrompt;
	chatMessageManager: ChatMessageManager;
	toolRegistryManager: ToolRegistryManager;
	structuredOutputAgent?: StructuredOutput;
}
