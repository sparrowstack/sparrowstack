import chalk from 'chalk';
import wrapAnsi from 'wrap-ansi';
import type { Agent } from '@sparrowstack/agent';

interface Params {
	agent: Agent;
}

export const printHeader = ({ agent }: Params) => {
	const { provider, systemPrompt, toolRegistryManager } = agent;

	console.log(
		chalk.greenBright(`
          Sparrow Agent          
   Interactive session started   
═════════════════════════════════════════
`),
	);
	console.log(`${chalk.bold('Provider:')} ${provider.displayName}`);
	console.log(`${chalk.bold('Model:')} ${provider.model}`);
	console.log('');
	console.log(`${chalk.bold('System Prompt Name:')} ${systemPrompt.name}`);
	console.log(
		wrapAnsi(
			`${chalk.bold('System Prompt Description:')} ${systemPrompt.description}`,
			60,
		),
	);
	console.log('');
	const toolNames = toolRegistryManager.getToolNames();

	if (toolNames.length > 0) {
		console.log(`${chalk.bold('Tools:')}`);
		toolNames.forEach((toolName: string) => {
			console.log(`  ${chalk.dim('•')} ${toolName}`);
		});

		console.log('');
	}

	if (agent.settings) {
		console.log(`${chalk.bold('Settings:')}`);

		Object.entries(agent.settings).forEach(([key, value]) => {
			console.log(`  ${chalk.dim('•')} ${key}: ${value}`);
		});

		console.log('');
	}

	console.log(chalk.dim('- Type "q" to quit'));
	console.log('');
	console.log('');
	console.log('');
};
