import chalk from 'chalk';

interface Params {
	message: string;
}

export const formatForSparrowResponse = ({ message }: Params) => {
	const sparrowPrompt = `${chalk.blueBright('[Sparrow]:')} `;

	return `\n${sparrowPrompt} ${message}`;
};
