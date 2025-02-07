import { SystemPrompt } from '@system-prompt';
import { ToolRegistry } from '@agent/core/ToolRegistry';
import { ChatMessageManager } from '@agent/core/ChatMessageManager';
import { providers } from '@agent/core/ProviderFactory/common/constants';
import { ProviderName } from '@agent/core/providers/BaseProvider/common/enums/ProviderName';

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
