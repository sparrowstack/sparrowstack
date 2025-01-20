import chalk from 'chalk';
import { AgentLogger } from '@AgentLogger';
import type { IChatMessage } from '@Agent/common/interfaces';

interface IOptions {
	logger: AgentLogger;
	systemPrompt: string;
	messages: IChatMessage[];
}

export const infoLogContextWindow = ({ logger, systemPrompt, messages }: IOptions) => {
	console.log('');

	logger.info(
		chalk.dim(`
------------------------------------ 
Context Window:
------------------------------------
System Prompt:
${systemPrompt}

Messages:
${JSON.stringify(messages, null, 2)}
`),
	);
};
