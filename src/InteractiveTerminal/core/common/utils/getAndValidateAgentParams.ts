import { getApiKey } from './getApiKey';
import { getProvider } from './getProvider';
import { getSystemPrompt } from './getSystemPrompt';
import { AgentLogger } from '../../../../AgentLogger';
import type { ICommandLineArgs } from '../interfaces';
import { SystemPrompts, Provider, Model } from '../../../../Agent';

import {
	validateApiKey,
	validateValidSystemPrompt,
	validateBothProviderAndModelProvided,
} from '../validations';

interface IOptions {
	logger: AgentLogger;
	commandLineArgs: ICommandLineArgs;
}

export const getAndValidateAgentParams = ({
	commandLineArgs,
	logger,
}: IOptions) => {
	const {
		model: modelName,
		provider: providerName,
		systemPrompt: systemPromptName,
	} = commandLineArgs;

	// Validates that both provider and model are provided
	validateBothProviderAndModelProvided({
		logger,
		modelName,
		providerName,
	});

	// Provides Provider
	let provider: Provider = Provider.Anthropic;
	if (providerName) {
		provider = getProvider({ providerName });
	}

	// Provides Model
	const model = modelName || Model.Anthropic.Claude35Sonnet;

	// Provides System Prompt
	let systemPrompt: string = SystemPrompts.Default;
	if (systemPromptName) {
		validateValidSystemPrompt({
			logger,
			systemPromptName,
		});
		systemPrompt = getSystemPrompt({ systemPromptName });
	}

	// Provides API Key
	const apiKey = getApiKey({ provider }) as string;
	validateApiKey({
		logger,
		apiKey,
		provider,
	});

	return {
		model,
		apiKey,
		provider,
		systemPrompt,
	};
};
