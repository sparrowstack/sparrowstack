import { Logger } from '@Logger';
import { defaultPrompt } from '@SystemPrompts';
import { Agent, Provider, Model } from '@Agent';
import type { ICommandLineArgs } from '@InteractiveTerminal/common/interfaces';
import { validateApiKey } from '@InteractiveTerminal/core/InstantiateAgent/validation/validators/validateApiKey';
import { getApiKey } from '@InteractiveTerminal/core/InstantiateAgent/classMethods/instantiateAgentWithCommandLineArgs/common/utils/getApiKey';
import { getProvider } from '@InteractiveTerminal/core/InstantiateAgent/classMethods/instantiateAgentWithCommandLineArgs/common/utils/getProvider';

interface IParams {
	logger: Logger;
	commandLineArgs: ICommandLineArgs;
}

export const instantiateAgentWithCommandLineArgs = ({
	logger,
	commandLineArgs,
}: IParams) => {
	const { model: modelName, provider: providerName } = commandLineArgs;

	// Provides Model
	const defaultModel = Model.Anthropic.Claude35Sonnet;
	const modelFromArg = modelName;
	const model = modelFromArg || defaultModel;

	// Provides Provider
	const defaultProvider = Provider.Anthropic;
	const providerFromArg = getProvider({ providerName });
	const provider = providerFromArg || defaultProvider;

	// Provides System Prompt
	const systemPrompt = defaultPrompt;

	// Provides API Key
	const apiKey = getApiKey({ provider }) as string;
	validateApiKey({
		logger,
		apiKey,
		providerName,
	});

	return new Agent({
		model,
		apiKey,
		provider,
		systemPrompt,
	});
};
