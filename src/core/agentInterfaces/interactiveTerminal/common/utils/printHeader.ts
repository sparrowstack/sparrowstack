import chalk from 'chalk';
import type { IBaseLLM } from '../../../../../common/interfaces';

interface IOptions {
	llm: IBaseLLM;
}

export const printHeader = ({ llm }: IOptions) => {
	const { provider, model } = llm;
	const providerNameCapitalized =
		provider.charAt(0).toUpperCase() + provider.slice(1);

	console.log(
		chalk.greenBright(`
           AI Agent           
   Interactive session started   
═════════════════════════════════════════
`),
	);
	console.log(`Provider: ${providerNameCapitalized}`);
	console.log(`Model: ${model}`);
	console.log('');
	console.log(chalk.dim('- Type "q" to quit'));
	console.log('');
	console.log('');
	console.log('');
};
