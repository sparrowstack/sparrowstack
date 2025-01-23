import chalk from 'chalk';
import { AgentLogger } from '@AgentLogger';
import type { ILLMResponseMessage } from '@Agent/common/interfaces';

interface IParams {
	logger: AgentLogger;
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
