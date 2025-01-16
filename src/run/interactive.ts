import { Agent } from '../Agent';
import { Provider, AnthropicModel } from '../common/enums';

const provider = Provider.Anthropic;
const apiKey = process.env['ANTHROPIC_API_KEY'] || '';
const model = AnthropicModel.Claude35Sonnet20240620;

const agent = new Agent({ provider, apiKey, model });

agent.startInteractive();
