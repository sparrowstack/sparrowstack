import { ProviderName } from '@sparrowstack/core';
import { providerSDKs } from '@core/ProviderSDKFactory/common/constants';
import type { ProviderSDK } from '@core/ProviderSDKFactory/common/types';

export class ProviderSDKFactory {
	static create({
		apiKey,
		providerName,
	}: {
		apiKey: string;
		providerName: ProviderName;
	}): ProviderSDK {
		const ProviderSdk = providerSDKs[providerName];
		const providerSDK = new ProviderSdk({ apiKey });

		return providerSDK;
	}
}
