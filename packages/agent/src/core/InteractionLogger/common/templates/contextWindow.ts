import chalk from 'chalk';

interface Params {
	systemPrompt: string;
	messages: unknown[];
}

export const contextWindowTemplate = ({ messages, systemPrompt }: Params) => {
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
