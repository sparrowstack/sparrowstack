import chalk from 'chalk';
import type { BaseLLM } from '@Agent';

interface IParams {
	llm: BaseLLM;
}

export const printHeader = ({ llm }: IParams) => {
	const { providerName, model, systemPromptName } = llm;

	console.log(
		chalk.greenBright(`
           AI Agent           
   Interactive session started   
═════════════════════════════════════════
`),
	);
	console.log(`Provider: ${providerName}`);
	console.log(`Model: ${model}`);
	console.log(`System Prompt: ${systemPromptName}`);
	console.log('');
	console.log(chalk.dim('- Type "q" to quit'));
	console.log('');
	console.log('');
	console.log('');
};
