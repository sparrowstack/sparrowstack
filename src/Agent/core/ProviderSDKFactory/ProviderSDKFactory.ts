import { Provider } from '@Agent';
import { providerSDKs } from '@Agent/core/ProviderSDKFactory/common/constants';
import type { ProviderSDK } from '@Agent/core/ProviderSDKFactory/common/types';

export class ProviderSDKFactory {
	static create({
		apiKey,
		provider,
	}: {
		apiKey: string;
		provider: Provider;
	}): ProviderSDK {
		const ProviderSdk = providerSDKs[provider];
		const providerSDK = new ProviderSdk({ apiKey });

		return providerSDK;
	}
}
