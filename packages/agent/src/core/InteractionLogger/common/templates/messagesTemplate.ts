import chalk from 'chalk';

interface IParams {
	messages: unknown[];
}

export const messagesTemplate = ({ messages }: IParams) => {
	return chalk.dim(`
------------------------------------ 
Messages:
------------------------------------
${JSON.stringify(messages, null, 2)}
`);
};
