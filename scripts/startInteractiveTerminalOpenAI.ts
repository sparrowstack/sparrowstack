import {
	Agent,
	Model,
	ApiKey,
	ProviderName,
	InteractiveTerminal,
} from '@sparrow/core';
import { getDirectoryStructureTool } from '@sparrow/community/tools';
import { softwareEngineerTypeScriptPrompt } from '@sparrow/community/system-prompts';

// Configuration
// --------------------------------
const tools = [getDirectoryStructureTool];
const systemPrompt = softwareEngineerTypeScriptPrompt;

const model = Model.OpenAI.GPT4o;
const provider = ProviderName.OpenAI;
const apiKey = process.env[ApiKey.OpenAI] as string;
// --------------------------------

// Ask GPT about naming here:
// modelName
// providerName,
const agent = new Agent({
	model,
	tools,
	apiKey,
	provider,
	systemPrompt,
});
const interactiveTerminal = new InteractiveTerminal({ agent });

await interactiveTerminal.start();
