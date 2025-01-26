import chalk from 'chalk';
import type { IChatMessage } from '@Agent/core/ChatMessageFactory';

interface IParams {
	systemPrompt: string;
	messages: IChatMessage[];
}

export const contextWindowTemplate = ({ messages, systemPrompt }: IParams) => {
	return chalk.dim(`
------------------------------------ 
Context Window:
------------------------------------
System Prompt:
${systemPrompt}

Messages:
${JSON.stringify(messages, null, 2)}
`);
};
