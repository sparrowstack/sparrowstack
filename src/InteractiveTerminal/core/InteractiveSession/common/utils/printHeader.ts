import chalk from 'chalk';
import wrapAnsi from 'wrap-ansi';
import type { BaseLLM } from '@Agent';

interface IParams {
	llm: BaseLLM;
}

export const printHeader = ({ llm }: IParams) => {
	const { providerName, model, systemPrompt, tools } = llm;

	console.log(
		chalk.greenBright(`
          Sparrow Agent          
   Interactive session started   
═════════════════════════════════════════
`),
	);
	console.log(`${chalk.bold('Provider:')} ${providerName}`);
	console.log(`${chalk.bold('Model:')} ${model}`);
	console.log('');
	console.log(`${chalk.bold('System Prompt Name:')} ${systemPrompt.name}`);
	console.log(
		wrapAnsi(
			`${chalk.bold('System Prompt Description:')} ${systemPrompt.description}`,
			60,
		),
	);
	console.log('');
	console.log(`${chalk.bold('Tools:')} [`);
	console.log(tools?.map((tool) => `${tool.name}`).join(',\n'));
	console.log(`]`);
	console.log('');
	console.log(chalk.dim('- Type "q" to quit'));
	console.log('');
	console.log('');
	console.log('');
};
