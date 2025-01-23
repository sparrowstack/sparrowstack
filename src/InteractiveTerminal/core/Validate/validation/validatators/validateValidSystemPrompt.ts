import { SystemPrompts } from '@Agent';
import { AgentLogger } from '@AgentLogger';
import { isValidSystemPromptErrorTemplate } from '@Validate/validation/errorTemplates';

interface IParams {
	systemPromptName: string;
	logger: AgentLogger;
}

export const validateValidSystemPrompt = ({
	logger,
	systemPromptName,
}: IParams) => {
	const errorTemplate = isValidSystemPromptErrorTemplate({
		systemPromptName,
	});

	if (typeof systemPromptName === 'string') {
		if (!SystemPrompts[systemPromptName]) {
			logger.error(errorTemplate);
			process.exit(1);
		}
	}
};
