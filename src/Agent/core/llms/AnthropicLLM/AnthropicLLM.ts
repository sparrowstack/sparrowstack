import { BaseLLM } from '../BaseLLM';
import { sendMessage } from './core';
import { Anthropic } from '@anthropic-ai/sdk';
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

export class AnthropicLLM extends BaseLLM {
	model: Model;
	maxTokens: number;
	systemPrompt: string;
	anthropic: Anthropic;
	provider = Provider.Anthropic;
	logger = new AgentLogger('AnthropicLLM');

	constructor({ model, apiKey, systemPrompt }: IContructorOptions) {
		super();

		this.model = model;
		this.maxTokens = 1024;
		this.systemPrompt = systemPrompt || SystemPrompts.Default;

		this.anthropic = new Anthropic({
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
			anthropic: this.anthropic,
		});
	}
}
