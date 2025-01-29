import { Tool } from '@Tool';
import { SystemPrompt } from '@SystemPrompt';
import { ChatMessageManager } from '@Agent/core/ChatMessageManager';
import { providers } from '@Agent/core/ProviderFactory/common/constants';
import { ProviderName } from '@Agent/core/providers/BaseProvider/common/enums/ProviderName';

export class ProviderFactory {
	public static create({
		model,
		tools,
		apiKey,
		systemPrompt,
		providerName,
		chatMessageManager,
		providerDisplayName,
	}: {
		model: string;
		tools: Tool[];
		apiKey: string;
		systemPrompt: SystemPrompt;
		providerName: ProviderName;
		providerDisplayName: string;
		chatMessageManager: ChatMessageManager;
	}) {
		const Provider = providers[providerName as keyof typeof providers];
		const provider = new Provider({
			model,
			tools,
			apiKey,
			systemPrompt,
			chatMessageManager,
			name: providerName,
			displayName: providerDisplayName,
		});

		return provider;
	}
}
