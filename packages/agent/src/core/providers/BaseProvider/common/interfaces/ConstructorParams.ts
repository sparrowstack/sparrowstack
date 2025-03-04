import { ProviderName } from '@sparrowstack/core';
import { ToolRegistry } from '@core/ToolRegistry';
import { ChatMessageManager } from '@sparrowstack/chat-message-manager';
import { SystemPrompt } from '@sparrowstack/system-prompt';

export interface ConstructorParams {
	model: string;
	apiKey: string;
	name: ProviderName;
	displayName: string;
	systemPrompt: SystemPrompt;
	toolRegistry: ToolRegistry;
	chatMessageManager: ChatMessageManager;
}
