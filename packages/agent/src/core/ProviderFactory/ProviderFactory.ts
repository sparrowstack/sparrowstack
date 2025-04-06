import { ProviderName } from '@sparrowstack/core';
import { ToolRegistry } from '@core/ToolRegistry';
import type { Settings } from '@agent/common/interfaces';
import { SystemPrompt } from '@sparrowstack/system-prompt';
import { providers } from '@core/ProviderFactory/common/constants';
import { ChatMessageManager } from '@sparrowstack/chat-message-manager';

interface IParams {
	model: string;
	apiKey: string;
	settings?: Settings;
	systemPrompt: SystemPrompt;
	providerName: ProviderName;
	toolRegistry: ToolRegistry;
	providerDisplayName: string;
	responseFormatAgent: any;
	chatMessageManager: ChatMessageManager;
}

export class ProviderFactory {
	public static create({
		model,
		apiKey,
		settings,
		toolRegistry,
		systemPrompt,
		providerName,
		chatMessageManager,
		responseFormatAgent,
		providerDisplayName,
	}: IParams) {
		const Provider = providers[providerName as keyof typeof providers];
		const provider = new Provider({
			model,
			apiKey,
			settings,
			systemPrompt,
			toolRegistry,
			chatMessageManager,
			name: providerName,
			responseFormatAgent,
			displayName: providerDisplayName,
		});

		return provider;
	}
}
