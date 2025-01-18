import OpenAI from 'openai';
import { BaseLLM } from '../BaseLLM';
import { sendMessage } from './core';
import { SystemPrompts } from '../../SystemPrompts';
import { AgentLogger } from '../../../../AgentLogger';
import { Provider } from '../../../common/enums';
import type { Model } from '../../../common/types';
import type { ILLMResponseMessage } from '../../../common/interfaces';

interface IContructorOptions {
	apiKey: string;
	model: Model;
	systemPrompt?: string;
}

export class OpenAILLM extends BaseLLM {
	model: Model;
	maxTokens: number;
	systemPrompt: string;
	openai: OpenAI;
	provider = Provider.OpenAI;
	logger = new AgentLogger('OpenAILLM');

	constructor({ model, apiKey, systemPrompt }: IContructorOptions) {
		super();

		this.model = model;
		this.maxTokens = 1024;
		this.systemPrompt = systemPrompt || SystemPrompts.Default;

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
