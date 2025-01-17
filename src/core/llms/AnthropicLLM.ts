import { BaseLLM } from './BaseLLM';
import { Anthropic } from '@anthropic-ai/sdk';
import { Provider, AnthropicModel } from '../../common/enums';

export class AnthropicLLM extends BaseLLM {
	maxTokens: number;
	anthropic: Anthropic;
	model: AnthropicModel;
	provider = Provider.Anthropic;

	constructor({ model, apiKey }: { model: AnthropicModel; apiKey: string }) {
		super();
		this.model = model;
		this.maxTokens = 1024;
		this.anthropic = new Anthropic({
			apiKey,
		});
	}

	async sendMessage({
		message,
	}: {
		message: string;
	}): Promise<Anthropic.Message> {
		this.addToHistory({ role: 'user', content: message });

		const messages = [...this.messageHistory];

		console.log(messages);

		const params: Anthropic.MessageCreateParams = {
			messages: messages as Anthropic.MessageParam[],
			model: this.model,
			max_tokens: this.maxTokens,
			system: 'You are a helpful AI assistant. Who is an expert in TypeScript and mows the best lawns in town.',
		};

		const response = await this.anthropic.messages.create(params);

		// Add assistant's response to history
		this.addToHistory({
			role: 'assistant',
			content:
				response.content[0].type === 'text'
					? response.content[0].text
					: '',
		});

		return response;
	}
}
