// import type { IToolParams } from '@Tool';
import { InteractiveTerminal } from '@InteractiveTerminal';
import { Agent, Provider, Model /*, SystemPrompts*/ } from '@Agent';

// const helloWorldTool: IToolParams = {
// 	name: 'helloWorld',
// 	description: `What the user says 'hello world', call this tool`,
// 	function: async () => {
// 		return 'Hello, world!';
// 	},
// };

// Configuration
// --------------------------------
// const tools = [helloWorldTool];
// const systemPrompt = SystemPrompts.Default;

const provider = Provider.Anthropic;
const model = Model.Anthropic.Claude35Sonnet;
const apiKey = process.env['ANTHROPIC_API_KEY'] as string;

// const provider = Provider.OpenAI;
// const model = Model.OpenAI.GPT4o;
// const apiKey = process.env['OPENAI_API_KEY'] as string;
// --------------------------------

const agent = new Agent({
	model,
	// tools,
	apiKey,
	provider,
	// systemPrompt,
});
const interactiveTerminal = new InteractiveTerminal({ agent });

await interactiveTerminal.start();
