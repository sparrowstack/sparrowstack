import { ProviderNameApiKeys } from '@Agent/common/constants';

interface IOptions {
	provider: string;
}

export const getApiKey = ({ provider }: IOptions) => {
	const apiKey = ProviderNameApiKeys[provider];

	return apiKey;
};
