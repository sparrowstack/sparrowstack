import {
	Agent,
	Model,
	ApiKey,
	ProviderName,
	InteractiveTerminal,
} from '@Sparrow';
import { getDirectoryStructureTool } from '@Tools'; // community tools
import { softwareEngineerTypeScriptPrompt } from '@SystemPrompts'; // community prompts

// Configuration
// --------------------------------
const tools = [getDirectoryStructureTool];
const systemPrompt = softwareEngineerTypeScriptPrompt;

const model = Model.OpenAI.GPT4o;
const provider = ProviderName.OpenAI;
const apiKey = process.env[ApiKey.OpenAI] as string;
// --------------------------------

const agent = new Agent({
	model,
	tools,
	apiKey,
	provider,
	systemPrompt,
});
const interactiveTerminal = new InteractiveTerminal({ agent });

await interactiveTerminal.start();
