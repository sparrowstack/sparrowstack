import OpenAI from 'openai';
import { BaseLLM } from '../BaseLLM';
import { sendMessage } from './core';
import { SystemPrompts, SystemPromptName } from '../../SystemPrompts';
import { AgentLogger } from '../../../../AgentLogger';
import { Provider, ProviderName } from '../../../common/enums';
import type { ILLMResponseMessage } from '../../../common/interfaces';

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
