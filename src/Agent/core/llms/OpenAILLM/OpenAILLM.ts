import OpenAI from 'openai';
import type { IToolParams } from '@Tool';
import { Provider } from '@Agent/common/enums';
import { BaseLLM } from '@Agent/core/llms/BaseLLM/BaseLLM';
import type { IModelResponse } from '@Agent/core/llms/BaseLLM/common/interfaces';
import { sendMessage } from '@Agent/core/llms/OpenAILLM/classMethods';

interface IContructorOptions {
	model: string;
	apiKey: string;
	tools?: IToolParams[];
	systemPrompt?: string;
}

export class OpenAILLM extends BaseLLM {
	maxTokens: number;
	openai: OpenAI;

	constructor({ model, apiKey, systemPrompt, tools }: IContructorOptions) {
		super({ model, provider: Provider.OpenAI, tools, systemPrompt });

		this.maxTokens = 1024;

		this.openai = new OpenAI({
			apiKey,
		});
	}

	async sendMessage({
		message,
	}: {
		message: string;
	}): Promise<IModelResponse> {
		return await sendMessage({
			message,
			llm: this,
			logger: this.logger,
			openai: this.openai,
		});
	}
}
