import { ProviderName } from '@agent/core/providers/BaseProvider/common/enums/ProviderName';
import { providerSDKs } from '@agent/core/ProviderSDKFactory/common/constants';
import type { ProviderSDK } from '@agent/core/ProviderSDKFactory/common/types';

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
