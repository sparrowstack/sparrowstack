import { Agent, Provider, Model } from '@Agent';
import { getDirectoryStructureTool } from '@Tools';
import { InteractiveTerminal } from '@InteractiveTerminal';
import { softwareEngineerTypeScriptPrompt } from '@SystemPrompts';

// Configuration
// --------------------------------
const tools = [getDirectoryStructureTool];
const systemPrompt = softwareEngineerTypeScriptPrompt;

const provider = Provider.OpenAI;
const model = Model.OpenAI.GPT4o;
const apiKey = process.env['OPENAI_API_KEY'] as string;
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
