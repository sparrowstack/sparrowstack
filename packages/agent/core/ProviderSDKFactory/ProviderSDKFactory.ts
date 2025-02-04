import { ProviderName } from '@/packages/agent/core/providers/BaseProvider/common/enums/ProviderName';
import { providerSDKs } from '@/packages/agent/core/ProviderSDKFactory/common/constants';
import type { ProviderSDK } from '@/packages/agent/core/ProviderSDKFactory/common/types';

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
