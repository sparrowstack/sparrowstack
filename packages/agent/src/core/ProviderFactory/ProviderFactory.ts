import { ProviderName } from '@sparrowstack/core';
import { ToolRegistry } from '@core/ToolRegistry';
import { ChatMessageManager } from '@sparrowstack/chat-message-manager';
import { SystemPrompt } from '@sparrowstack/system-prompt';
import { providers } from '@core/ProviderFactory/common/constants';

export class ProviderFactory {
	public static create({
		model,
		apiKey,
		toolRegistry,
		systemPrompt,
		providerName,
		chatMessageManager,
		providerDisplayName,
	}: {
		model: string;
		apiKey: string;
		systemPrompt: SystemPrompt;
		providerName: ProviderName;
		toolRegistry: ToolRegistry;
		providerDisplayName: string;
		chatMessageManager: ChatMessageManager;
	}) {
		const Provider = providers[providerName as keyof typeof providers];
		const provider = new Provider({
			model,
			apiKey,
			systemPrompt,
			toolRegistry,
			chatMessageManager,
			name: providerName,
			displayName: providerDisplayName,
		});

		return provider;
	}
}
