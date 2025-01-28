import { Provider } from '@Agent';
import { providerStrategies } from '@Agent/core/ProviderFactory/common/constants';

export class ProviderFactory {
	public static create({ provider }: { provider: Provider }) {
		const ProviderStrategy =
			providerStrategies[provider as keyof typeof providerStrategies];
		const providerStrategy = new ProviderStrategy();

		return providerStrategy;
	}
}
