import { BaseLLM } from '../BaseLLM';
import { Anthropic } from '@anthropic-ai/sdk';
import type { LLMResponseMessage } from '../../../common/types';
import { Role, Provider, AnthropicModel } from '../../../common/enums';

const defaultSystemPrompt =
	'You are a helpful AI assistant who is an expert in TypeScript.';

export class AnthropicLLM extends BaseLLM {
	maxTokens: number;
	systemPrompt: string;
	anthropic: Anthropic;
	model: AnthropicModel;
	provider = Provider.Anthropic;

	constructor({
		model,
		apiKey,
		systemPrompt,
	}: {
		apiKey: string;
		systemPrompt?: string;
		model: AnthropicModel;
	}) {
		super();

		this.model = model;
		this.maxTokens = 1024;
		this.systemPrompt = systemPrompt || defaultSystemPrompt;

		this.anthropic = new Anthropic({
			apiKey,
		});
	}

	getTextFromResponseMessage({
		responseMessage,
	}: {
		responseMessage: LLMResponseMessage;
	}) {
		return responseMessage.content[0].type === 'text'
			? responseMessage.content[0].text
			: '';
	}

	async sendMessage({
		message,
	}: {
		message: string;
		// TODO: Return message needs to be custom for app
	}): Promise<LLMResponseMessage> {
		const userMessage = { role: Role.User, content: message };
		this.addToMessages({ message: userMessage });

		const messages = [...this.messages];

		const params: Anthropic.MessageCreateParams = {
			messages: messages as Anthropic.MessageParam[],
			model: this.model,
			max_tokens: this.maxTokens,
			system: this.systemPrompt,
		};

		const responseMessage = await this.anthropic.messages.create(params);

		// Add assistant's response to history
		const assistantMessage = {
			role: Role.Assistant,
			content: this.getTextFromResponseMessage({ responseMessage }),
		};
		this.addToMessages({ message: assistantMessage });

		return responseMessage as LLMResponseMessage;
	}
}
