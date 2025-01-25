import { Tool, type IToolParams } from '@Tool';
import { SystemPrompt, type ISystemPromptParams } from '@SystemPrompt';
import { Anthropic } from '@anthropic-ai/sdk';
import { Provider } from '@Agent/common/enums';
import { BaseLLM } from '@Agent/core/llms/BaseLLM/BaseLLM';
import { sendMessage } from '@Agent/core/llms/AnthropicLLM/classMethods';
import type { IModelResponse } from '@Agent/core/ModelResponseAdapter/common/interfaces';

interface IContructorParams {
	model: string;
	apiKey: string;
	tools?: Tool[] | IToolParams[];
	systemPrompt?: SystemPrompt | ISystemPromptParams;
}

export class AnthropicLLM extends BaseLLM {
	maxTokens: number;
	anthropic: Anthropic;

	constructor({ model, apiKey, systemPrompt, tools }: IContructorParams) {
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
