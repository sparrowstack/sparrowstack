import chalk from 'chalk';
import { Logger } from '@Logger';
import type { IModelResponse } from '@Agent/core/llms/BaseLLM/common/interfaces';

interface IParams {
	logger: Logger;
	message: IModelResponse;
}

export const logModelResponse = ({ logger, message }: IParams) => {
	console.log('');

	logger.info(
		chalk.dim(`
------------------------------------ 
Model Response:
------------------------------------
${JSON.stringify(message, null, 2)}
`),
	);
};
