import { AgentLogger } from '../../../../../AgentLogger';
import { apiKeyErrorTemplate } from '../errorTemplates';

interface IOptions {
	apiKey: string | undefined;
	providerName: string;
	logger: AgentLogger;
}

export const validateApiKey = ({ apiKey, providerName, logger }: IOptions) => {
	const errorTemplate = apiKeyErrorTemplate({ providerName });

	if (!apiKey) {
		console.log('');
		logger.error(errorTemplate);
		console.log('');
		process.exit(1);
	}
};
