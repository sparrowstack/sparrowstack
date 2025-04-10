import { ProviderName } from '@sparrowstack/core';
import { ToolRegistryManager } from '@core/ToolRegistryManager';
import type { Settings } from '@agent/common/interfaces';
import { SystemPrompt } from '@sparrowstack/system-prompt';
import { providers } from '@core/ProviderFactory/common/constants';
import { ChatMessageManager } from '@sparrowstack/chat-message-manager';

interface Params {
	model: string;
	apiKey: string;
	settings?: Settings;
	structuredOutputAgent: any;
	systemPrompt: SystemPrompt;
	providerName: ProviderName;
	providerDisplayName: string;
	chatMessageManager: ChatMessageManager;
	toolRegistryManager: ToolRegistryManager;
}

export class ProviderFactory {
	public static create({
		model,
		apiKey,
		settings,
		systemPrompt,
		providerName,
		chatMessageManager,
		toolRegistryManager,
		structuredOutputAgent,
		providerDisplayName,
	}: Params) {
		const Provider = providers[providerName as keyof typeof providers];
		const provider = new Provider({
			model,
			apiKey,
			settings,
			systemPrompt,
			toolRegistryManager,
			chatMessageManager,
			name: providerName,
			structuredOutputAgent,
			displayName: providerDisplayName,
		});

		return provider;
	}
}
