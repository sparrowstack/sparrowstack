import { Provider, ProviderName } from '../../../Agent/common/enums';

interface IOptions {
	providerName: string;
}

export const getProvider = ({ providerName }: IOptions): Provider => {
	const providerEnumName =
		ProviderName[providerName as keyof typeof ProviderName];
	const provider = Provider[providerEnumName as keyof typeof Provider];

	if (!provider) {
		throw new Error(`Provider ${providerName} not found`);
	}

	return provider;
};
