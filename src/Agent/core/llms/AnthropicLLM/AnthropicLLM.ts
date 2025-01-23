import { AgentLogger } from '@AgentLogger';
import { Anthropic } from '@anthropic-ai/sdk';
import { Provider } from '@Agent/common/enums';
import { BaseLLM } from '@Agent/core/llms/BaseLLM';
import { ProviderName } from '@Agent/common/constants';
import { parseToolSchemas } from '@Agent/core/llms/common/utils';
import type { ILLMResponseMessage } from '@Agent/common/interfaces';
import { sendMessage } from '@Agent/core/llms/AnthropicLLM/classMethods';
import { SystemPrompts, SystemPromptName } from '@Agent/core/SystemPrompts';
import type {
	ITool,
	IToolCalls,
	IToolSchema,
} from '@Agent/core/Tools/common/interfaces';

interface IContructorOptions {
	apiKey: string;
	model: string;
	systemPrompt?: string;
	tools?: IToolSchema[];
}

export class AnthropicLLM extends BaseLLM {
	model: string;
	maxTokens: number;
	systemPrompt: string;
	systemPromptName: string;
	tools?: ITool[];
	toolCalls?: IToolCalls;
	anthropic: Anthropic;
	provider = Provider.Anthropic;
	providerName = ProviderName[Provider.Anthropic];
	logger = new AgentLogger('AnthropicLLM');

	constructor({ model, apiKey, systemPrompt, tools }: IContructorOptions) {
		super();

		// Base
		// --------------------------------
		this.model = model;
		this.systemPrompt = systemPrompt || SystemPrompts.Default;
		this.systemPromptName = SystemPromptName[this.systemPrompt];

		if (tools) {
			const { tools: llmTools, toolCalls: llmToolCalls } =
				parseToolSchemas({
					tools,
				});

			this.tools = llmTools;
			this.toolCalls = llmToolCalls;
		}

		// Settings
		// --------------------------------
		this.maxTokens = 1024;

		// SDK
		// --------------------------------v
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
