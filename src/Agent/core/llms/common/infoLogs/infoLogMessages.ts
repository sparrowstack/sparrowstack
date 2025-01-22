import chalk from 'chalk';
import { AgentLogger } from '@AgentLogger';
import type { IChatMessage } from '@Agent/common/interfaces';

interface IOptions {
	logger: AgentLogger;
	messages: IChatMessage[];
}

export const infoLogMessages = ({ logger, messages }: IOptions) => {
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
