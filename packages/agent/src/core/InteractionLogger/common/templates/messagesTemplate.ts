import chalk from 'chalk';

interface Params {
	messages: unknown[];
}

export const messagesTemplate = ({ messages }: Params) => {
	return chalk.dim(`
------------------------------------ 
Messages:
------------------------------------
${JSON.stringify(messages, null, 2)}
`);
};
