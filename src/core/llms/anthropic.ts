import { Anthropic } from '@anthropic-ai/sdk';
import type { IBaseLLM } from '../../common/interfaces';
import { Provider, AnthropicModel } from '../../common/enums';

export class AnthropicLLM implements IBaseLLM {
	maxTokens: number;
	model: AnthropicModel;
	anthropic: Anthropic;
	provider = Provider.Anthropic;

	constructor({ model, apiKey }: { model: AnthropicModel; apiKey: string }) {
		this.maxTokens = 1024;
		this.model = model;
		this.anthropic = new Anthropic({
			apiKey,
		});
	}

	async sendMessage({
		message,
	}: {
		message: string;
	}): Promise<Anthropic.Message> {
		const params: Anthropic.MessageCreateParams = {
			model: this.model,
			max_tokens: this.maxTokens,
			messages: [{ role: 'user', content: message }],
		};

		const response = await this.anthropic.messages.create(params);

		return response;
	}
}
