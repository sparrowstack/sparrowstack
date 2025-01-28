import { Agent, Provider, Model } from '@Agent';
import { getDirectoryStructureTool } from '@Tools';
import { InteractiveTerminal } from '@InteractiveTerminal';
import { softwareEngineerTypeScriptPrompt } from '@SystemPrompts';

// Configuration
// --------------------------------
const tools = [getDirectoryStructureTool];
const systemPrompt = softwareEngineerTypeScriptPrompt;

const provider = Provider.Anthropic;
const model = Model.Anthropic.Claude35Sonnet;
const apiKey = process.env['ANTHROPIC_API_KEY'] as string;
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
