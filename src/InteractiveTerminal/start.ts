import { AgentLogger } from '../AgentLogger';
import { Agent } from '../Agent';
import { getCommandLineArgs, getModel, getSystemPrompt } from './common/utils';
import { InteractiveTerminal } from '../InteractiveTerminal';
import { getApiKey, getProvider } from './common/utils';
import type { ICommandLineArgs } from './common/interfaces';
import {
	validateApiKey,
	validateValidSystemPrompt,
	validateBothProviderAndModelProvided,
} from './validation/common/validations';

const logger = new AgentLogger('InteractiveTerminal');

const {
	provider: providerName,
	model: modelName,
	systemPrompt: systemPromptName,
} = <ICommandLineArgs>getCommandLineArgs();

const model = getModel({ providerName, modelName });
const provider = getProvider({ providerName });
validateBothProviderAndModelProvided({
	logger,
	model: modelName,
	provider: providerName,
});

const systemPrompt = getSystemPrompt({ systemPromptName });
validateValidSystemPrompt({
	logger,
	systemPrompt: systemPromptName,
});

const apiKey = getApiKey({ provider: providerName });
validateApiKey({
	apiKey,
	logger,
	provider: providerName,
});

// Configuration
// --------------------------------
// const provider = Provider.Anthropic;
// const model = Model.Anthropic.Claude35Sonnet;
// const systemPrompt = SystemPrompts.SoftwareEngineerTypeScript;
// const apiKey = process.env['ANTHROPIC_API_KEY'] || '';

// const provider = Provider.OpenAI;
// const model = Model.GPT4o;
// const systemPrompt = SystemPrompts.SoftwareEngineerTypeScript;
// --------------------------------

// Should we pull Agent into the InteractiveTerminal?
// Should agent be able to start the InteractiveTerminal?
const agent = new Agent({
	model,
	provider,
	systemPrompt,
	apiKey: apiKey as string,
});
const interactiveTerminal = new InteractiveTerminal({ agent });

await interactiveTerminal.start();
