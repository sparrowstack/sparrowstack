import chalk from 'chalk';
import { Logger } from '@Logger';
import type { IChatMessage } from '@ChatMessage';

interface IParams {
	logger: Logger;
	systemPrompt: string;
	messages: IChatMessage[];
}

export const logContextWindow = ({
	logger,
	messages,
	systemPrompt,
}: IParams) => {
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
