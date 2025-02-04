import { ProviderName } from '@sparrow/core/providers/BaseProvider/common/enums/ProviderName';
import { providerSDKs } from '@sparrow/core/ProviderSDKFactory/common/constants';
import type { ProviderSDK } from '@sparrow/core/ProviderSDKFactory/common/types';

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
