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

const provider = ProviderName.Anthropic;
const model = Model.Anthropic.Claude35Sonnet;
const apiKey = process.env[ApiKey.Anthropic] as string;
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
