import { Tool } from '@Tool';
import { ProviderName } from '@Agent';
import { SystemPrompt } from '@SystemPrompt';
import { ChatMessageManager } from '@Agent/core/ChatMessageManager';
import { providers } from '@Agent/core/ProviderFactory/common/constants';

export class ProviderFactory {
	public static create({
		model,
		tools,
		apiKey,
		displayName,
		providerName,
		systemPrompt,
		chatMessageManager,
	}: {
		model: string;
		tools: Tool[];
		apiKey: string;
		displayName: string;
		providerName: ProviderName;
		systemPrompt: SystemPrompt;
		chatMessageManager: ChatMessageManager;
	}) {
		const Provider = providers[providerName as keyof typeof providers];
		const provider = new Provider({
			model,
			tools,
			apiKey,
			displayName,
			providerName,
			systemPrompt,
			chatMessageManager,
		});

		return provider;
	}
}
