import { Agent, Model, ApiKey, Provider } from '@sparrowstack/sparrow';
import { InteractiveTerminal } from '@sparrowstack/interactive-terminal';
import { getDirectoryStructureTool } from '@sparrowstack/community/tools';
import { softwareEngineerTypeScriptPrompt } from '@sparrowstack/community/system-prompts';

// Configuration
// --------------------------------
const tools = [getDirectoryStructureTool];
const systemPrompt = softwareEngineerTypeScriptPrompt;

const model = Model.OpenAI.GPT4o;
const provider = Provider.OpenAI;
const apiKey = process.env[ApiKey.OpenAI] as string;
// --------------------------------

const agent = new Agent({
	model,
	tools,
	apiKey,
	provider,
	systemPrompt,
	// databaseUrl, - coming soon..
	// vectorDatabaseUrl, - coming soon..
});
const interactiveTerminal = new InteractiveTerminal({ agent });

await interactiveTerminal.start();
