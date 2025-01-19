import { Agent, Provider, Model, SystemPrompts } from '../Agent';
import { InteractiveTerminal } from '.';

// Configuration
// --------------------------------
const provider = Provider.Anthropic;
const model = Model.Anthropic.Claude35Sonnet;
const systemPrompt = SystemPrompts.SoftwareEngineerTypeScript;
const apiKey = process.env['ANTHROPIC_API_KEY'] as string;

// const provider = Provider.OpenAI;
// const model = Model.OpenAI.GPT4o;
// const systemPrompt = SystemPrompts.SoftwareEngineerTypeScript;
// const apiKey = process.env['OPENAI_API_KEY'] as string;
// --------------------------------

const agent = new Agent({
	model,
	apiKey,
	provider,
	systemPrompt,
});
const interactiveTerminal = new InteractiveTerminal({ agent });

await interactiveTerminal.start();
