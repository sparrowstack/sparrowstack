import chalk from 'chalk';
import { getAvailableProviders } from '../utils';

export const bothProviderAndModelProvidedErrorTemplate = () => {
	const availableProviders = getAvailableProviders();

	const errorTemplate = chalk.red(`

Both 'provider' and 'model' values required when specifying a provider/model.

Example:
bun start:interactiveTerminal --provider=anthropic --model=claude-3-5-sonnet-20241022

Available providers:
${availableProviders}

Available models:
OpenAI: https://platform.openai.com/docs/models
Anthropic: https://docs.anthropic.com/en/docs/about-claude/models

`);

	return errorTemplate;
};
