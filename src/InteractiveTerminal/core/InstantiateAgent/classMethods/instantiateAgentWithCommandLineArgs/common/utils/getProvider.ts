import { Provider, ProviderName } from '@Agent';

interface IParams {
	providerName: string;
}

export const getProvider = ({ providerName }: IParams): Provider => {
	const providerEnumName =
		ProviderName[providerName as keyof typeof ProviderName];
	const provider = Provider[providerEnumName as keyof typeof Provider];

	return provider;
};
