import { ProviderName } from '@Agent';

interface IParams {
	provider: ProviderName;
}

export const getProviderDisplayName = ({ provider }: IParams) => {
	return (
		Object.keys(ProviderName).find(
			(key) =>
				ProviderName[key as keyof typeof ProviderName] === provider,
		) || provider
	);
};
