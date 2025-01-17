import { Agent } from '../../../Agent';
import { InteractiveTerminal } from '..';
import { Provider, AnthropicModel } from '../../../common/enums';

// TODO: Make this configurable

// Configuration
// --------------------------------
const provider = Provider.Anthropic;
const model = AnthropicModel.Claude35Sonnet;
const apiKey = process.env['ANTHROPIC_API_KEY'] || '';
// --------------------------------

const agent = new Agent({ provider, apiKey, model });
const interactiveTerminal = new InteractiveTerminal({ agent });

await interactiveTerminal.start();
