import type { IToolParams } from '@Tool';
import { Anthropic } from '@anthropic-ai/sdk';
import { Provider } from '@Agent/common/enums';
import { BaseLLM } from '@Agent/core/llms/BaseLLM/BaseLLM';
import { sendMessage } from '@Agent/core/llms/AnthropicLLM/classMethods';
import type { IModelResponse } from '@Agent/core/llms/BaseLLM/common/interfaces';

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
	}): Promise<IModelResponse> {
		const responseMessage = await sendMessage({
			message,
			llm: this,
			anthropic: this.anthropic,
		});

		return responseMessage;
	}
}
