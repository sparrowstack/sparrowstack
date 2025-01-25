import { Agent, Provider, Model } from '@Agent';
import { getDirectoryStructureTool } from '@Tools';
import { InteractiveTerminal } from '@InteractiveTerminal';
import { softwareEngineerTypeScriptPromptParams } from '@SystemPrompts';

// Configuration
// --------------------------------
const tools = [getDirectoryStructureTool];
const systemPrompt = softwareEngineerTypeScriptPromptParams;

const provider = Provider.Anthropic;
const model = Model.Anthropic.Claude35Sonnet;
const apiKey = process.env['ANTHROPIC_API_KEY'] as string;

// const provider = Provider.OpenAI;
// const model = Model.OpenAI.GPT4o;
// const apiKey = process.env['OPENAI_API_KEY'] as string;
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
