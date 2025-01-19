import chalk from 'chalk';
import { SystemPrompts } from '../../../../../Agent';
import { AgentLogger } from '../../../../../AgentLogger';
import { getAvailableSystemPrompts } from './getAvailableSystemPrompts';

interface IOptions {
	systemPromptName: string;
	logger: AgentLogger;
}

export const validateValidSystemPrompt = ({
	logger,
	systemPromptName,
}: IOptions) => {
	const availableSystemPrompts = getAvailableSystemPrompts();
	const errorTemplate = chalk.red(`
			
The System Prompt '${systemPromptName}' is not available.

Available System Prompts:
${availableSystemPrompts}

Example:
bun start:interactive --provider=anthropic --model=claude-3-5-sonnet-20241022 --systemPrompt=SoftwareEngineerTypeScript

Note: If the system prompt is not provided, the default system prompt will be used.

`);

	if (typeof systemPromptName === 'string') {
		if (!SystemPrompts[systemPromptName]) {
			logger.error(errorTemplate);
			process.exit(1);
		}
	}
};
