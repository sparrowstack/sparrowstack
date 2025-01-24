import chalk from 'chalk';
import { Logger } from '@Logger';
// TODO: ChatMessage needs to be used, and a class here..
import type { IChatMessage } from '@ChatMessage';

interface IParams {
	logger: Logger;
	messages: IChatMessage[];
}

export const logMessages = ({ logger, messages }: IParams) => {
	console.log('');

	logger.info(
		chalk.dim(`
------------------------------------ 
Messages:
------------------------------------
${JSON.stringify(messages, null, 2)}
`),
	);
};
