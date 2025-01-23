import OpenAI from 'openai';
import type { IToolParams } from '@Tool';
import { Provider } from '@Agent/common/enums';
import { BaseLLM } from '@root/src/Agent/core/llms/BaseLLM/BaseLLM';
import type { ILLMResponseMessage } from '@Agent/common/interfaces';
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
	}): Promise<ILLMResponseMessage> {
		return await sendMessage({
			message,
			llm: this,
			logger: this.logger,
			openai: this.openai,
		});
	}
}
