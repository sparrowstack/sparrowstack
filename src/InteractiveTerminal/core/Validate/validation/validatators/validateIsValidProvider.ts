import { ProviderName } from '@Agent';
import { Logger } from '@Logger';
import { isValidProviderErrorTemplate } from '@InteractiveTerminal/core/Validate/validation/errorTemplates';

interface IParams {
	logger: Logger;
	providerName: string;
}

export const validateIsValidProvider = ({ logger, providerName }: IParams) => {
	const errorTemplate = isValidProviderErrorTemplate({ providerName });

	if (typeof providerName === 'string') {
		if (!ProviderName[providerName as keyof typeof ProviderName]) {
			logger.error(errorTemplate);
			process.exit(1);
		}
	}
};
