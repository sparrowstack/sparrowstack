import AnthropicSDK from '@anthropic-ai/sdk';
import type { ILLM } from '../common/interfaces';
import { AnthropicModel } from '../common/enums';

export class Anthropic implements ILLM {
	maxTokens: number;
	model: AnthropicModel;
	anthropic: AnthropicSDK;

	constructor({ model, apiKey }: { model: AnthropicModel; apiKey: string }) {
		this.maxTokens = 1024;
		this.model = model;
		this.anthropic = new AnthropicSDK({
			apiKey,
		});
	}

	async sendMessage({ message }: { message: string }) {
		const response = await this.anthropic.messages.create({
			model: this.model,
			max_tokens: this.maxTokens,
			messages: [{ role: 'user', content: message }],
		});

		return response;
	}
}
