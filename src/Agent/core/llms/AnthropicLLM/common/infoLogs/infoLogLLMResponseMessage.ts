import chalk from 'chalk';
import { AgentLogger } from '@AgentLogger';
import type { ILLMResponseMessage } from '@Agent/common/interfaces';

interface IOptions {
	logger: AgentLogger;
	message: ILLMResponseMessage;
}

export const infoLogLLMResponseMessage = ({ logger, message }: IOptions) => {
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
