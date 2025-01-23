import chalk from 'chalk';
import { Logger } from '@Logger';
import type { ILLMResponseMessage } from '@Agent/common/interfaces';

interface IParams {
	logger: Logger;
	message: ILLMResponseMessage;
}

export const infoLogLLMResponseMessage = ({ logger, message }: IParams) => {
	console.log('');

	logger.info(
		chalk.dim(`
------------------------------------ 
LLM Response Message:
------------------------------------
${JSON.stringify(message, null, 2)}
`),
	);
};
