import { Provider } from '@Agent';

interface IParams {
	provider: Provider;
}

export const getProviderDisplayName = ({ provider }: IParams) => {
	return (
		Object.keys(Provider).find(
			(key) => Provider[key as keyof typeof Provider] === provider,
		) || provider
	);
};
