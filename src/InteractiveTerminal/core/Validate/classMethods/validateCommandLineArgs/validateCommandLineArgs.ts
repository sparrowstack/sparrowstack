import { AgentLogger } from '../../../../../AgentLogger';
import type { ICommandLineArgs } from '../../../../common/interfaces';

import {
	validateIsValidProvider,
	validateValidSystemPrompt,
	validateBothProviderAndModelProvided,
} from '../../validation/validatators';

interface IOptions {
	logger: AgentLogger;
	commandLineArgs: ICommandLineArgs;
}

export const validateCommandLineArgs = ({
	logger,
	commandLineArgs,
}: IOptions) => {
	const {
		model: modelName,
		provider: providerName,
		systemPrompt: systemPromptName,
	} = commandLineArgs;

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

	if (systemPromptName) {
		validateValidSystemPrompt({
			logger,
			systemPromptName,
		});
	}

	return commandLineArgs;
};
