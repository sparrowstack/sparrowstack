import { Agent, Provider, Model, SystemPrompts } from '../../../../Agent';
import { AgentLogger } from '../../../../AgentLogger';
import type { ICommandLineArgs } from '../../../common/interfaces';
import { getApiKey } from '../common/utils/getApiKey';
import { getProvider } from '../common/utils/getProvider';
import { getSystemPrompt } from '../common/utils/getSystemPrompt';
import { validateApiKey } from '../common/validations/validateApiKey';

interface IOptions {
	logger: AgentLogger;
	commandLineArgs: ICommandLineArgs;
}

export const instantiateAgent = ({ logger, commandLineArgs }: IOptions) => {
	const {
		model: modelName,
		provider: providerName,
		systemPrompt: systemPromptName,
	} = commandLineArgs;

	// Provides Model
	const model = modelName || Model.Anthropic.Claude35Sonnet;

	// Provides Provider
	let provider: Provider = Provider.Anthropic;
	if (providerName) {
		provider = getProvider({ providerName });
	}

	// Provides System Prompt
	let systemPrompt: string = SystemPrompts.Default;
	if (systemPromptName) {
		systemPrompt = getSystemPrompt({ systemPromptName });
	}

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
