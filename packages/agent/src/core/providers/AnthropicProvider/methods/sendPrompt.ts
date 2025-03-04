import { Anthropic } from '@anthropic-ai/sdk';
import { ToolRegistry } from '@core/ToolRegistry';
import { ProviderName } from '@sparrowstack/core';
import { SystemPrompt } from '@sparrowstack/system-prompt';
import { ChatMessageManager } from '@sparrowstack/chat-message-manager';
import type { IModelResponse } from '@core/providers/BaseProvider/common/interfaces';
import { toModelResponse } from '@core/providers/AnthropicProvider/adapters/toModelResponse';

export interface IParams {
	model: string;
	sdk: Anthropic;
	maxTokens: number;
	toolRegistry: ToolRegistry;
	systemPrompt: SystemPrompt;
	providerName: ProviderName;
	chatMessageManager: ChatMessageManager;
}

export const sendPrompt = async ({
	sdk,
	model,
	maxTokens,
	systemPrompt,
	toolRegistry,
	providerName,
	chatMessageManager,
}: IParams): Promise<IModelResponse> => {
	const system = systemPrompt.getPrompt();
	const messages = chatMessageManager.getMessages<Anthropic.MessageParam>();
	const tools = toolRegistry.getToolSchemas<Anthropic.Tool>({
		providerName,
	});

	const rawResponse = (await sdk.messages.create({
		model,
		tools,
		system,
		messages,
		max_tokens: maxTokens,
	})) as Anthropic.Messages.Message;

	const response = toModelResponse({ response: rawResponse });

	return response;
};
