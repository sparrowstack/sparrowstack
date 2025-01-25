import { Logger } from '@Logger';
import { bothProviderAndModelProvidedErrorTemplate } from '@InteractiveTerminal/core/Validate/validation/errorTemplates';

interface IParams {
	modelName: string;
	logger: Logger;
	providerName: string;
}

export const validateBothProviderAndModelProvided = ({
	logger,
	modelName,
	providerName,
}: IParams) => {
	const errorTemplate = bothProviderAndModelProvidedErrorTemplate();

	if ((providerName && !modelName) || (modelName && !providerName)) {
		logger.error(errorTemplate);
		process.exit(1);
	}
};
