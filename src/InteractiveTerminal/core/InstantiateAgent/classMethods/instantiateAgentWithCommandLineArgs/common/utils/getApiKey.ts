import { ProviderNameApiKeys } from '@Agent/common/constants';

interface IParams {
	provider: string;
}

export const getApiKey = ({ provider }: IParams) => {
	const apiKey = ProviderNameApiKeys[provider];

	return apiKey;
};
