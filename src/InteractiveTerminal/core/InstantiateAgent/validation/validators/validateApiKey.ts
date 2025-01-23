import { AgentLogger } from '@AgentLogger';
import { apiKeyErrorTemplate } from '@InstantiateAgent/validation/errorTemplates';

interface IParams {
	apiKey: string | undefined;
	providerName: string;
	logger: AgentLogger;
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
