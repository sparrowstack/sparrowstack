import OpenAI from 'openai';
import { Provider } from '@Agent';
import { Tool, type IToolParams } from '@Tool';
import { SystemPrompt, type ISystemPromptParams } from '@SystemPrompt';
import { BaseLLM } from '@Agent/core/llms/BaseLLM/BaseLLM';
import type { IModelResponse } from '@ModelResponseAdapter/common/interfaces';
import { sendMessage } from '@Agent/core/llms/OpenAILLM/classMethods';

interface IContructorParams {
	model: string;
	apiKey: string;
	tools?: Tool[] | IToolParams[];
	systemPrompt?: SystemPrompt | ISystemPromptParams;
}

export class OpenAILLM extends BaseLLM {
	openai: OpenAI;

	constructor({ model, apiKey, systemPrompt, tools }: IContructorParams) {
		super({ model, provider: Provider.OpenAI, apiKey,tools, systemPrompt });

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
			openai: this.openai,
		});
	}
}
