import { AgentLogger } from '@AgentLogger';
import { Anthropic } from '@anthropic-ai/sdk';
import { Provider } from '@Agent/common/enums';
import { BaseLLM } from '@Agent/core/llms/BaseLLM';
import { ProviderName } from '@Agent/common/constants';
import type { ILLMResponseMessage } from '@Agent/common/interfaces';
import { sendMessage } from '@Agent/core/llms/AnthropicLLM/classMethods';
import { SystemPrompts, SystemPromptName } from '@Agent/core/SystemPrompts';

interface IContructorOptions {
	apiKey: string;
	model: string;
	systemPrompt?: string;
}

export class AnthropicLLM extends BaseLLM {
	model: string;
	maxTokens: number;
	systemPrompt: string;
	systemPromptName: string;
	anthropic: Anthropic;
	provider = Provider.Anthropic;
	providerName = ProviderName[Provider.Anthropic];
	logger = new AgentLogger('AnthropicLLM');

	constructor({ model, apiKey, systemPrompt }: IContructorOptions) {
		super();

		this.model = model;
		this.maxTokens = 1024;
		this.systemPrompt = systemPrompt || SystemPrompts.Default;
		this.systemPromptName = SystemPromptName[this.systemPrompt];

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
