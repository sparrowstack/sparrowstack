import chalk from 'chalk';
import type { IChatMessage } from '@root/src/Agent/core/ChatMessageFactory';

interface IParams {
	messages: IChatMessage[];
}

export const messagesTemplate = ({ messages }: IParams) => {
	return chalk.dim(`
------------------------------------ 
Messages:
------------------------------------
${JSON.stringify(messages, null, 2)}
`);
};
