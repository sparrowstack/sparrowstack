import chalk from 'chalk';
import { AgentLogger } from '../../../../AgentLogger';
import { getAvailableModels, getAvailableProviders } from '../utils';

interface IOptions {
	provider: string;
	model: string;
	logger: AgentLogger;
}

export const validateBothProviderAndModelProvided = ({
	provider,
	model,
	logger,
}: IOptions) => {
	const availableModels = getAvailableModels();
	const availableProviders = getAvailableProviders();
	const errorTemplate =
		chalk.red(`Both 'provider' and 'model' values required when specifying a provider/model.

Example:
bun start:interactive --provider=anthropic --model=claude-3-5-sonnet-20241022

Available providers:
${availableProviders}

Available models:
${availableModels}
`);

	if ((provider && !model) || (model && !provider)) {
		logger.error(errorTemplate);
		process.exit(1);
	}
};
