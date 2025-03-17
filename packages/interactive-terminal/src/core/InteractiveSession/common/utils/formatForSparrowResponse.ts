import chalk from 'chalk';

interface IParams {
	message: string;
}

export const formatForSparrowResponse = ({ message }: IParams) => {
	const sparrowPrompt = `${chalk.blueBright('[Sparrow]:')} `;

	return `\n${sparrowPrompt} ${message}`;
};
