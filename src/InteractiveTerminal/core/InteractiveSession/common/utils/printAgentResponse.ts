import chalk from 'chalk';

interface IParams {
	response: string;
}

export const printAgentResponse = ({ response }: IParams) => {
	const agentPrompt = `${chalk.greenBright('[Agent]:')} `;

	console.log('');
	console.log(`${agentPrompt} ${response}`);
	console.log('');
};
