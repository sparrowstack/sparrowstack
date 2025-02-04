import {
	Agent,
	Model,
	ApiKey,
	Provider,
} from '@/packages/sparrowstack/sparrow';
import { InteractiveTerminal } from '@/packages/sparrowstack/interactive-terminal';
import {
	getWeatherDataToolParams,
	getDirectoryStructureToolParams,
} from '@/packages/sparrowstack/community/tools';

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
