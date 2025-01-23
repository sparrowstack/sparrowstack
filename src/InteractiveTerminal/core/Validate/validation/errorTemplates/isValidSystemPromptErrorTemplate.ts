import chalk from 'chalk';
import { getAvailableSystemPrompts } from '@Validate/validation/utils';

interface IParams {
	systemPromptName: string;
}

export const isValidSystemPromptErrorTemplate = ({
	systemPromptName,
}: IParams) => {
	const availableSystemPrompts = getAvailableSystemPrompts();
	const errorTemplate = chalk.red(`
			
The System Prompt '${systemPromptName}' is not available.

Available System Prompts:
${availableSystemPrompts}

Example:
bun start:interactiveTerminal --provider=anthropic --model=claude-3-5-sonnet-20241022 --systemPrompt=SoftwareEngineerTypeScript

Note: If the System Prompt is not provided, the default System Prompt will be used.

`);

	return errorTemplate;
};
