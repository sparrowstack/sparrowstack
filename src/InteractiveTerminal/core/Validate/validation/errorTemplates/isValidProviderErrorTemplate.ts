import chalk from 'chalk';
import { Provider } from '../../../../../Agent';
import { getAvailableProviders } from '../utils/getAvailableProviders';

interface IOptions {
	providerName: string;
}

export const isValidProviderErrorTemplate = ({ providerName }: IOptions) => {
	const availableProviders = getAvailableProviders();
	const errorTemplate = chalk.red(`

The Provider '${providerName}' is not currently supported.

Available Providers:
${availableProviders}

Example:
bun start:interactiveTerminal --provider=anthropic --model=claude-3-5-sonnet-20241022 --systemPrompt=SoftwareEngineerTypeScript

Note: If the Provider is not provided, the default Provider '${Provider.Anthropic}' will be used.

`);

	return errorTemplate;
};
