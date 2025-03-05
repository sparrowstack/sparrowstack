import chalk from 'chalk';

interface IParams {
	systemPrompt: string;
	messages: unknown[];
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
