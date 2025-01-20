import chalk from 'chalk';
import { AgentLogger } from '../../../../../AgentLogger';

enum ApiKeys {
	openai = 'OPENAI_API_KEY',
	anthropic = 'ANTHROPIC_API_KEY',
}

interface IOptions {
	apiKey: string | undefined;
	providerName: string;
	logger: AgentLogger;
}

export const validateApiKey = ({ apiKey, providerName, logger }: IOptions) => {
	const apiKeyName = ApiKeys[providerName as keyof typeof ApiKeys];
	const errorTemplate = chalk.red(
		`No API key found for Provider ${providerName}. 

Please add your ${providerName} API key to '${apiKeyName}' in your '.env' file.`,
	);

	if (!apiKey) {
		console.log('');
		logger.error(errorTemplate);
		console.log('');
		process.exit(1);
	}
};
