import { Provider } from '@Agent';
import { providerSDKs } from '@Agent/core/ProviderSDKFactory/common/constants';
import type { ProviderSDK } from '@Agent/core/ProviderSDKFactory/common/types';

export class ProviderSDKFactory {
	static create({
		apiKey,
		providerName,
	}: {
		apiKey: string;
		providerName: Provider;
	}): ProviderSDK {
		const ProviderSdk = providerSDKs[providerName];
		const providerSDK = new ProviderSdk({ apiKey });

		return providerSDK;
	}
}
