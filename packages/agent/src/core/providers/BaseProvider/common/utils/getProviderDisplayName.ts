import { ProviderName } from '@sparrowstack/core';

interface Params {
	providerName: ProviderName;
}

export const getProviderDisplayName = ({ providerName }: Params) => {
	return (
		Object.keys(ProviderName).find(
			(key) =>
				ProviderName[key as keyof typeof ProviderName] === providerName,
		) || providerName
	);
};
