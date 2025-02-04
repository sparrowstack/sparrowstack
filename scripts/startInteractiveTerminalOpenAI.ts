import {
	Agent,
	Model,
	ApiKey,
	Provider,
} from '@/packages/sparrowstack/sparrow';
import { InteractiveTerminal } from '@/packages/sparrowstack/interactive-terminal';
// import { softwareEngineerTypeScriptPrompt } from '@sparrowstack/community/system-prompts';
import {
	getWeatherDataToolParams,
	getDirectoryStructureToolParams,
} from '@/packages/sparrowstack/community/tools';

// Configuration
// --------------------------------
// const systemPrompt = softwareEngineerTypeScriptPrompt;
const tools = [getWeatherDataToolParams, getDirectoryStructureToolParams];

const model = Model.OpenAI.GPT4o;
const provider = Provider.OpenAI;
const apiKey = process.env[ApiKey.OpenAI] as string;
// --------------------------------

const agent = new Agent({
	model,
	tools,
	apiKey,
	provider,
	// systemPrompt,
	// databaseUrl, - coming soon..
	// vectorDatabaseUrl, - coming soon..
});
const interactiveTerminal = new InteractiveTerminal({ agent });

await interactiveTerminal.start();
