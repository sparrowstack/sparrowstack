import { Provider } from '@Agent';
import { providers } from '@Agent/core/ProviderFactory/common/constants';

export class ProviderFactory {
	public static create({
		model,
		apiKey,
		provider: providerName,
	}: {
		model: string;
		apiKey: string;
		provider: Provider;
	}) {
		const Provider = providers[providerName as keyof typeof providers];
		const provider = new Provider({
			model,
			apiKey,
			provider: providerName,
		});

		return provider;
	}
}
