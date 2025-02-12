import { SystemPrompt } from '@sparrowstack/system-prompt';
import { ToolRegistry } from '@core/ToolRegistry';
import { ChatMessageManager } from '@core/ChatMessageManager';
import { providers } from '@core/ProviderFactory/common/constants';
import { ProviderName } from '@core/providers/BaseProvider/common/enums/ProviderName';

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
