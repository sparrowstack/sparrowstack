import { Provider } from '@Agent';

export const getAvailableProviders = () => {
	const availableProviders = Object.values(Provider)
		.map((providerValue) => {
			return `- ${providerValue}\n`;
		})
		.join('');

	return availableProviders;
};
