import { ProviderName } from '@sparrowstack/core';

interface IParams {
	providerName: ProviderName;
}

export const getProviderDisplayName = ({ providerName }: IParams) => {
	return (
		Object.keys(ProviderName).find(
			(key) =>
				ProviderName[key as keyof typeof ProviderName] === providerName,
		) || providerName
	);
};
