import chalk from 'chalk';
import { Provider, ProviderName } from '../../../../../Agent';
import { AgentLogger } from '../../../../../AgentLogger';
import { getAvailableProviders } from '../utils/getAvailableProviders';

interface IOptions {
	logger: AgentLogger;
	providerName: string;
}

export const validateIsValidProvider = ({ logger, providerName }: IOptions) => {
	const availableProviders = getAvailableProviders();
	const errorTemplate = chalk.red(`

The Provider '${providerName}' is not currently supported.

Available Providers:
${availableProviders}

Example:
bun start:interactiveTerminal --provider=anthropic --model=claude-3-5-sonnet-20241022 --systemPrompt=SoftwareEngineerTypeScript

Note: If the provider is not provided, the default Provider '${Provider.Anthropic}' will be used.

`);

	if (typeof providerName === 'string') {
		if (!ProviderName[providerName as keyof typeof ProviderName]) {
			logger.error(errorTemplate);
			process.exit(1);
		}
	}
};
