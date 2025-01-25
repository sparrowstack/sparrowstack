import { Logger } from '@Logger';
import { apiKeyErrorTemplate } from '@InteractiveTerminal/core/InstantiateAgent/validation/errorTemplates';

interface IParams {
	apiKey: string | undefined;
	providerName: string;
	logger: Logger;
}

export const validateApiKey = ({ apiKey, providerName, logger }: IParams) => {
	const errorTemplate = apiKeyErrorTemplate({ providerName });

	if (!apiKey) {
		console.log('');
		logger.error(errorTemplate);
		console.log('');
		process.exit(1);
	}
};
