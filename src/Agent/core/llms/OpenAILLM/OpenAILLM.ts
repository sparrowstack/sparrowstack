import OpenAI from 'openai';
import { AgentLogger } from '@AgentLogger';
import { Provider } from '@Agent/common/enums';
import { BaseLLM } from '@Agent/core/llms/BaseLLM';
import { ProviderName } from '@Agent/common/constants';
import type { ILLMResponseMessage } from '@Agent/common/interfaces';
import { sendMessage } from '@Agent/core/llms/OpenAILLM/classMethods';
import { SystemPrompts, SystemPromptName } from '@Agent/core/SystemPrompts';

interface IContructorOptions {
	apiKey: string;
	model: string;
	systemPrompt?: string;
}

export class OpenAILLM extends BaseLLM {
	model: string;
	maxTokens: number;
	systemPrompt: string;
	systemPromptName: string;
	openai: OpenAI;
	provider = Provider.OpenAI;
	providerName = ProviderName[Provider.OpenAI];
	logger = new AgentLogger('OpenAILLM');

	constructor({ model, apiKey, systemPrompt }: IContructorOptions) {
		super();

		this.model = model;
		this.maxTokens = 1024;
		this.systemPrompt = systemPrompt || SystemPrompts.Default;
		this.systemPromptName = SystemPromptName[this.systemPrompt];

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
