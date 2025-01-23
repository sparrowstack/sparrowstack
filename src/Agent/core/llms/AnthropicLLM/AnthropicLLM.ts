import type { IToolParams } from '@Tool';
import { Anthropic } from '@anthropic-ai/sdk';
import { Provider } from '@Agent/common/enums';
import { BaseLLM } from '@root/src/Agent/core/llms/BaseLLM/BaseLLM';
import type { ILLMResponseMessage } from '@Agent/common/interfaces';
import { sendMessage } from '@Agent/core/llms/AnthropicLLM/classMethods';

interface IContructorOptions {
	model: string;
	apiKey: string;
	tools?: IToolParams[];
	systemPrompt?: string;
}

export class AnthropicLLM extends BaseLLM {
	maxTokens: number;
	anthropic: Anthropic;

	constructor({ model, apiKey, systemPrompt, tools }: IContructorOptions) {
		super({ model, provider: Provider.Anthropic, tools, systemPrompt });

		this.maxTokens = 1024;

		this.anthropic = new Anthropic({
			apiKey,
		});
	}

	async sendMessage({
		message,
	}: {
		message: string;
	}): Promise<ILLMResponseMessage> {
		const responseMessage = await sendMessage({
			message,
			llm: this,
			logger: this.logger,
			anthropic: this.anthropic,
		});

		return responseMessage;
	}
}
