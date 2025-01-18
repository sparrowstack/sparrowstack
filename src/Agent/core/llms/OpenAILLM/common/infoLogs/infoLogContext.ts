import chalk from 'chalk';
import { AgentLogger } from '../../../../../../AgentLogger';
import type { IChatMessage } from '../../../../../common/interfaces';

interface IOptions {
	logger: AgentLogger;
	systemPrompt: string;
	messages: IChatMessage[];
}

export const infoLogContext = ({
	logger,
	systemPrompt,
	messages,
}: IOptions) => {
	console.log('');

	logger.info(
		chalk.dim(`
------------------------------------ 
Context:
------------------------------------
System:
${systemPrompt}

Messages:
${JSON.stringify(messages, null, 2)}
`),
	);
};
