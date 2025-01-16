import { Loom, Provider, AnthropicModel } from 'loom';

const provider = Provider.Anthropic;
const apiKey = process.env['ANTHROPIC_API_KEY'] || '';
const model = AnthropicModel.Claude35Sonnet20240620;

const agent = new Loom({ provider, apiKey, model });

agent.startInteractive();
