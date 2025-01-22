import { AgentLogger } from '@AgentLogger';
import { Anthropic } from '@anthropic-ai/sdk';
import { Provider } from '@Agent/common/enums';
import { BaseLLM } from '@Agent/core/llms/BaseLLM';
import { ProviderName } from '@Agent/common/constants';
import type { ILLMResponseMessage } from '@Agent/common/interfaces';
import { sendMessage } from '@Agent/core/llms/AnthropicLLM/classMethods';
import { SystemPrompts, SystemPromptName } from '@Agent/core/SystemPrompts';

export const formatToolCalls = ({ tools }: { tools: any[] }) => {
	return {
		llmTools: tools.map((obj) => obj.tool),
		toolCalls: tools.reduce(
			(acc, obj) => ({
				...acc,
				[obj.toolCall.name]: obj.toolCall.method,
			}),
			{} as Record<string, () => string>,
		),
	};
};

interface IContructorOptions {
	apiKey: string;
	model: string;
	systemPrompt?: string;
	tools?: any[];
}

export class AnthropicLLM extends BaseLLM {
	model: string;
	maxTokens: number;
	systemPrompt: string;
	systemPromptName: string;
	tools?: any[];
	toolCalls?: Record<string, CallableFunction>;
	anthropic: Anthropic;
	provider = Provider.Anthropic;
	providerName = ProviderName[Provider.Anthropic];
	logger = new AgentLogger('AnthropicLLM');

	constructor({ model, apiKey, systemPrompt, tools }: IContructorOptions) {
		super();

		// Base
		this.model = model;
		this.systemPrompt = systemPrompt || SystemPrompts.Default;
		this.systemPromptName = SystemPromptName[this.systemPrompt];

		if (tools) {
			const { llmTools, toolCalls } = formatToolCalls({ tools });
			this.tools = llmTools;
			this.toolCalls = toolCalls;
		}

		// Additional Parameters
		this.maxTokens = 1024;

		this.anthropic = new Anthropic({
			apiKey,
		});
	}

	async sendMessage({
		message,
	}: {
		message: string;
	}): Promise<ILLMResponseMessage> {
		const responseMessage = await sendMessage({
			message,
			llm: this,
			logger: this.logger,
			anthropic: this.anthropic,
		});

		return responseMessage;
	}
}
