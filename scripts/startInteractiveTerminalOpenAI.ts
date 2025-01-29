import {
	Agent,
	Model,
	ApiKey,
	Provider,
	InteractiveTerminal,
} from '@sparrow/core';
import { getDirectoryStructureTool } from '@sparrow/community/tools';
import { softwareEngineerTypeScriptPrompt } from '@sparrow/community/system-prompts';

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
});
const interactiveTerminal = new InteractiveTerminal({ agent });

await interactiveTerminal.start();
