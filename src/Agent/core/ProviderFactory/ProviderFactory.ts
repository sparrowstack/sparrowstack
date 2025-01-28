import { Provider } from '@Agent';
import { ChatMessageManager } from '@Agent/core/ChatMessageManager';
import { providers } from '@Agent/core/ProviderFactory/common/constants';

export class ProviderFactory {
	public static create({
		model,
		apiKey,
		displayName,
		chatMessageManager,
		provider: providerEnum,
	}: {
		model: string;
		apiKey: string;
		provider: Provider;
		displayName: string;
		chatMessageManager: ChatMessageManager;
	}) {
		const Provider = providers[providerEnum as keyof typeof providers];
		const provider = new Provider({
			model,
			apiKey,
			displayName,
			chatMessageManager,
			provider: providerEnum,
		});

		return provider;
	}
}
