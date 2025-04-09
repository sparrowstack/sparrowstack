import { Anthropic } from '@anthropic-ai/sdk';
import { ToolRegistry } from '@core/ToolRegistry';
import { ProviderName } from '@sparrowstack/core';
import type { Settings } from '@agent/common/interfaces';
import { SystemPrompt } from '@sparrowstack/system-prompt';
import { ChatMessageManager } from '@sparrowstack/chat-message-manager';
import type { ModelResponse } from '@core/providers/BaseProvider/common/interfaces';
import { toModelResponse } from '@core/providers/AnthropicProvider/common/adapters/toModelResponse';
import { buildMessageParams } from '@core/providers/AnthropicProvider/methods/common/utils/buildMessageParams';

export interface IParams {
	model: string;
	sdk: Anthropic;
	settings?: Settings;
	toolRegistry: ToolRegistry;
	systemPrompt: SystemPrompt;
	providerName: ProviderName;
	chatMessageManager: ChatMessageManager;
	responseFormatAgent: Record<string, unknown>;
	responseFormatSendMessage?: Record<string, unknown>;
}

export const sendPrompt = async ({
	sdk,
	model,
	settings,
	systemPrompt,
	toolRegistry,
	providerName,
	chatMessageManager,
	responseFormatAgent,
	responseFormatSendMessage,
}: IParams): Promise<ModelResponse> => {
	const system = systemPrompt.getPrompt();
	const messages = chatMessageManager.getMessages<Anthropic.MessageParam>();
	const tools = toolRegistry.getToolSchemas<Anthropic.Tool>({
		providerName,
	});
	const responseFormat = responseFormatSendMessage || responseFormatAgent;
	const messageParams = buildMessageParams({
		model,
		tools,
		system,
		messages,
		settings,
		responseFormat,
	});

	const rawResponse = (await sdk.messages.create(
		messageParams,
	)) as Anthropic.Messages.Message;

	const response = toModelResponse({ response: rawResponse });

	return response;
};
