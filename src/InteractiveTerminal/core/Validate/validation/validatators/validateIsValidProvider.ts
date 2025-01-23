import { ProviderName } from '@Agent';
import { Logger } from '@root/src/Logger';
import { isValidProviderErrorTemplate } from '@Validate/validation/errorTemplates';

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
