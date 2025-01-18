import { Provider } from './Provider';

// Reverse mapping of Provider to ProviderName
export const ProviderName: {
	[key: string]: keyof typeof Provider;
} = Object.entries(Provider).reduce(
	(acc, [key, value]) => ({
		...acc,
		[value]: key,
	}),
	{},
);
