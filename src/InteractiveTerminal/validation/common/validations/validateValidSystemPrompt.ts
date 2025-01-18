import chalk from 'chalk';
import { SystemPrompts } from '../../../../Agent';
import { getAvailableSystemPrompts } from '../utils';
import { AgentLogger } from '../../../../AgentLogger';

interface IOptions {
	systemPrompt: string;
	logger: AgentLogger;
}

export const validateValidSystemPrompt = ({
	logger,
	systemPrompt,
}: IOptions) => {
	const availableSystemPrompts = getAvailableSystemPrompts();
	const errorTemplate =
		chalk.red(`The System Prompt '${systemPrompt}' is not available.

Available System Prompts:
${availableSystemPrompts}

Example:
bun start:interactive --provider=anthropic --model=claude-3-5-sonnet-20241022 --systemPrompt=SoftwareEngineerTypeScript

Note: If the system prompt is not provided, the default system prompt will be used.
`);

	if (typeof systemPrompt === 'string') {
		if (!SystemPrompts[systemPrompt]) {
			logger.error(errorTemplate);
			process.exit(1);
		}
	}
};
