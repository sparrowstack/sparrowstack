import { Logger } from '@Logger';
import type { ICommandLineArgs } from '@InteractiveTerminal/common/interfaces';

import {
	validateIsValidProvider,
	// validateValidSystemPrompt,
	validateBothProviderAndModelProvided,
} from '@InteractiveTerminal/core/Validate/validation/validatators';

interface IParams {
	logger: Logger;
	commandLineArgs: ICommandLineArgs;
}

export const validateCommandLineArgs = ({
	logger,
	commandLineArgs,
}: IParams) => {
	const { model: modelName, provider: providerName } = commandLineArgs;

	validateBothProviderAndModelProvided({
		logger,
		modelName,
		providerName,
	});

	if (providerName) {
		validateIsValidProvider({
			logger,
			providerName,
		});
	}

	// if (systemPromptName) {
	// 	validateValidSystemPrompt({
	// 		logger,
	// 		systemPromptName,
	// 	});
	// }

	return commandLineArgs;
};
