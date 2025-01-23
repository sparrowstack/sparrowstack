import { SystemPrompts } from '@Agent';
import { Logger } from '@root/src/Logger';
import { isValidSystemPromptErrorTemplate } from '@Validate/validation/errorTemplates';

interface IParams {
	systemPromptName: string;
	logger: Logger;
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
