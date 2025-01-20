import { ProviderName } from '@Agent';
import { AgentLogger } from '@AgentLogger';
import { isValidProviderErrorTemplate } from '@InteractiveTerminal/core/Validate/validation/errorTemplates';

interface IOptions {
	logger: AgentLogger;
	providerName: string;
}

export const validateIsValidProvider = ({ logger, providerName }: IOptions) => {
	const errorTemplate = isValidProviderErrorTemplate({ providerName });

	if (typeof providerName === 'string') {
		if (!ProviderName[providerName as keyof typeof ProviderName]) {
			logger.error(errorTemplate);
			process.exit(1);
		}
	}
};
