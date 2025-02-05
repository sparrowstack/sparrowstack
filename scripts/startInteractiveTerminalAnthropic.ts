import { Agent, Model, ApiKey, Provider } from '@agent';
import { InteractiveTerminal } from '@interactive-terminal';
import {
	getWeatherDataToolParams,
	getDirectoryStructureToolParams,
} from '@tools';

// Configuration
// --------------------------------
// const systemPrompt = softwareEngineerTypeScriptPrompt;
const tools = [getWeatherDataToolParams, getDirectoryStructureToolParams];

const provider = Provider.Anthropic;
const model = Model.Anthropic.Claude35Sonnet;
const apiKey = process.env[ApiKey.Anthropic] as string;
// --------------------------------
// Instantiate Agent
const agent = new Agent({
	model,
	tools,
	apiKey,
	provider,
	// databaseUrl, - coming soon..
	// vectorDatabaseUrl, - coming soon..
});

// Start Interactive Terminal
const interactiveTerminal = new InteractiveTerminal({ agent });
await interactiveTerminal.start();
