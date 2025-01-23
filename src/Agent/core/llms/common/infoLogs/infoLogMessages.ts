import chalk from 'chalk';
import { Logger } from '@Logger';
import type { IChatMessage } from '@Agent/common/interfaces';

interface IParams {
	logger: Logger;
	messages: IChatMessage[];
}

export const infoLogMessages = ({ logger, messages }: IParams) => {
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
