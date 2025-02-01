import { Agent, Model, ApiKey, Provider } from '@sparrowstack/sparrow';
import { InteractiveTerminal } from '@sparrowstack/interactive-terminal';
import { getWeatherDataToolParams } from '@sparrowstack/community/tools';

// Configuration
// const provider = Provider.Anthropic;
// const model = Model.Anthropic.Claude35Sonnet;
// const apiKey = process.env[ApiKey.Anthropic] as string;
const provider = Provider.OpenAI;
const model = Model.OpenAI.GPT4o;
const apiKey = process.env[ApiKey.OpenAI] as string;

// Instantiate Agent
const agent = new Agent({
	model,
	apiKey,
	provider,
	tools: [getWeatherDataToolParams],
});

// Start Interactive Terminal
const interactiveTerminal = new InteractiveTerminal({ agent });
await interactiveTerminal.start();
