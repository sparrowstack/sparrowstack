import { AgentLogger } from '@AgentLogger';
import { Agent, Provider, Model, SystemPrompts } from '@Agent';
import type { ICommandLineArgs } from '@InteractiveTerminal/common/interfaces';
import { validateApiKey } from '@InstantiateAgent/validation/validators/validateApiKey';
import { getApiKey } from '@InstantiateAgent/classMethods/instantiateAgentWithCommandLineArgs/common/utils/getApiKey';
import { getProvider } from '@InstantiateAgent/classMethods/instantiateAgentWithCommandLineArgs/common/utils/getProvider';

interface IOptions {
	logger: AgentLogger;
	commandLineArgs: ICommandLineArgs;
}

export const instantiateAgentWithCommandLineArgs = ({
	logger,
	commandLineArgs,
}: IOptions) => {
	const {
		model: modelName,
		provider: providerName,
		systemPrompt: systemPromptName,
	} = commandLineArgs;

	// Provides Model
	const defaultModel = Model.Anthropic.Claude35Sonnet;
	const modelFromArg = modelName;
	const model = modelFromArg || defaultModel;

	// Provides Provider
	const defaultProvider = Provider.Anthropic;
	const providerFromArg = getProvider({ providerName });
	const provider = providerFromArg || defaultProvider;

	// Provides System Prompt
	const defaultSystemPrompt = SystemPrompts.Default;
	const systemPromptFromArg = SystemPrompts[systemPromptName];
	const systemPrompt = systemPromptFromArg || defaultSystemPrompt;

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
