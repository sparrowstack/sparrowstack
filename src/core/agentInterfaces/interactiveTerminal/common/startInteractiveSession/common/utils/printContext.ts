import chalk from 'chalk';
import { BaseLLM } from '../../../../../../llms/BaseLLM';

interface IOptions {
	llm: BaseLLM;
}

export const printContext = ({ llm }: IOptions): void => {
	console.log('');
	console.log(chalk.dim('Prompt:'));
	console.log('');
	console.log(chalk.dim('System:'));
	console.log(chalk.dim(JSON.stringify(llm.systemPrompt, null, 2)));
	console.log('');
	console.log(chalk.dim('Messages:'));
	console.log(chalk.dim(JSON.stringify(llm.getMessages(), null, 2)));
	console.log('');
};
