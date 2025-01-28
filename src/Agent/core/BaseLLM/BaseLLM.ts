import { Logger } from '@Logger';
import { Tool, type IToolParams } from '@Tool';
import { Provider } from '@Agent';
import { defaultPrompt } from '@SystemPrompts/default';
import { ToolsFactory } from '@Agent/core/ToolsFactory';
import { InteractionLogger } from '@Agent/core/InteractionLogger';
import { ChatMessageManager } from '@Agent/core/ChatMessageManager';
import { SystemPrompt, type ISystemPromptParams } from '@SystemPrompt';
import { SystemPromptFactory } from '@Agent/core/SystemPromptFactory';
import type { IModelResponse } from '@Agent/common/interfaces';
import { ProviderFactory } from '@Agent/core/ProviderFactory';
import { OpenAIProvider } from '@Agent/core/providers/OpenAIProvider';
import { AnthropicProvider } from '@Agent/core/providers/AnthropicProvider';
import { ToolCallManager } from '@Agent/core/ToolCallManager';

interface IConstructorParams {
	model: string;
	apiKey: string;
	provider: Provider;
	tools?: Tool[] | IToolParams[];
	systemPrompt?: SystemPrompt | ISystemPromptParams;
}

export class BaseLLM {
	// Provider 
	readonly provider: OpenAIProvider | AnthropicProvider;

	// Base
	readonly systemPrompt: SystemPrompt;

	// Utilities
	readonly logger: Logger;
	readonly interactionLogger: InteractionLogger;
	readonly chatMessageManager: ChatMessageManager;

	// Tool Calling
	readonly tools?: Tool[];
	readonly functions?: Record<IToolParams['name'], IToolParams['function']>;

	// Settings
	readonly maxTokens: number;

	constructor({
		model,
		tools,
		apiKey,
		provider,
		systemPrompt = defaultPrompt,
	}: IConstructorParams) {
		// Provider Strategy
		// --------------------------------
		this.provider = ProviderFactory.create({
			model,
			apiKey,
			provider,
		});

		// System Prompt
		// --------------------------------
		this.systemPrompt = SystemPromptFactory.create({ systemPrompt });

		// Tool Calling
		// --------------------------------
		const toolsRegistry = ToolsFactory.create({ tools });

		this.tools = toolsRegistry?.tools;
		this.functions = toolsRegistry?.functions;

		// Settings
		// --------------------------------
		this.maxTokens = 1024;

		// Utilities
		// --------------------------------
		this.logger = new Logger(this.provider.properName);
		this.interactionLogger = new InteractionLogger({ logger: this.logger });
		this.chatMessageManager = new ChatMessageManager();
	}

	public async sendMessage({
		message,
	}: {
		message: string;
	}): Promise<IModelResponse> {
		this.chatMessageManager.addUserMessage({ text: message });

		this.interactionLogger.logContextWindow({ llm: this });

		const modelResponseMessage = await this.provider.sendPrompt({
			llm: this,
		});

		const toolCallResponseMessage = await ToolCallManager.handleToolCalls({
			llm: this,
			responseMessage: modelResponseMessage,
		});

		const responseMessage = toolCallResponseMessage || modelResponseMessage;

		this.chatMessageManager.addAssistantMessage({
			text: responseMessage.text,
		});

		return responseMessage;
	}
}
