import { AgentLogger } from '@AgentLogger';
import { bothProviderAndModelProvidedErrorTemplate } from '@Validate/validation/errorTemplates';

interface IOptions {
	modelName: string;
	logger: AgentLogger;
	providerName: string;
}

export const validateBothProviderAndModelProvided = ({
	logger,
	modelName,
	providerName,
}: IOptions) => {
	const errorTemplate = bothProviderAndModelProvidedErrorTemplate();

	if ((providerName && !modelName) || (modelName && !providerName)) {
		logger.error(errorTemplate);
		process.exit(1);
	}
};
