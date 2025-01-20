import chalk from 'chalk';
import { ApiKeys } from '@Agent/common/enums';

interface IOptions {
	providerName: string;
}

export const apiKeyErrorTemplate = ({ providerName }: IOptions) => {
	const apiKeyName = ApiKeys[providerName as keyof typeof ApiKeys];
	const errorTemplate = chalk.red(
		`
No API key found for Provider ${providerName}. 

Please add your ${providerName} API key to '${apiKeyName}' in your '.env' file.`,
	);

	return errorTemplate;
};
