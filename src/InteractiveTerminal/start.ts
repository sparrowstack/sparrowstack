import { Agent, Provider, Model, SystemPrompts } from '../Agent';
import { InteractiveTerminal } from '../InteractiveTerminal';

// TODO: Make this configurable

// Configuration
// --------------------------------
const provider = Provider.Anthropic;
const model = Model.Claude35Sonnet;
const systemPrompt = SystemPrompts.Nova;
const apiKey = process.env['ANTHROPIC_API_KEY'] || '';
// --------------------------------

// Should we pull Agent into the InteractiveTerminal?
// Should agent be able to start the InteractiveTerminal?
const agent = new Agent({ provider, apiKey, model, systemPrompt });
const interactiveTerminal = new InteractiveTerminal({ agent });

await interactiveTerminal.start();
