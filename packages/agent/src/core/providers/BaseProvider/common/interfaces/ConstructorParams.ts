import { ProviderName } from '@sparrowstack/core';
import type { Settings } from '@agent/common/interfaces';
import { SystemPrompt } from '@sparrowstack/system-prompt';
import { ToolRegistryManager } from '@core/ToolRegistryManager';
import { ChatMessageManager } from '@sparrowstack/chat-message-manager';

export interface ConstructorParams {
	model: string;
	apiKey: string;
	name: ProviderName;
	displayName: string;
	settings?: Settings;
	responseFormatAgent?: any;
	systemPrompt: SystemPrompt;
	chatMessageManager: ChatMessageManager;
	toolRegistryManager: ToolRegistryManager;
}
