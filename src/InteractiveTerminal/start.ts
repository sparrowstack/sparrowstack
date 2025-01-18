import { AgentLogger } from '../AgentLogger';
import { Agent, Provider } from '../Agent';
import type { Model } from '../Agent/common/types';
import { getCommandLineArgs } from './common/utils';
import { InteractiveTerminal } from '../InteractiveTerminal';
import { getApiKey } from './common/utils';
import {
	validateApiKey,
	validateValidSystemPrompt,
	validateBothProviderAndModelProvided,
} from './validation/common/validations';

const logger = new AgentLogger('InteractiveTerminal');

interface ICommandLineArgs {
	model: Model;
	provider: Provider;
	systemPrompt: string;
}

const { provider, model, systemPrompt } = <ICommandLineArgs>(
	getCommandLineArgs()
);

const apiKey = getApiKey({ provider });
console.log(apiKey);

validateBothProviderAndModelProvided({ provider, model, logger });
validateValidSystemPrompt({ systemPrompt, logger });
validateApiKey({ apiKey, provider, logger });

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
	provider,
	model,
	systemPrompt,
	apiKey: apiKey as string,
});
const interactiveTerminal = new InteractiveTerminal({ agent });

await interactiveTerminal.start();
