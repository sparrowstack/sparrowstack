import OpenAI from 'openai';
import { ToolRegistry } from '@core/ToolRegistry';
import { ProviderName } from '@sparrowstack/core';
import type { Settings } from '@agent/common/interfaces';
import { SystemPrompt } from '@sparrowstack/system-prompt';
import type { ChatMessageManager } from '@sparrowstack/chat-message-manager';
import type { ModelResponse } from '@core/providers/BaseProvider/common/interfaces';
import { buildChatParams } from '@core/providers/OpenAIProvider/methods/sendPrompt/common/utils';
import { toModelResponse } from '@core/providers/OpenAIProvider/common/adapters/toModelResponse';

export interface IParams {
	sdk: OpenAI;
	model: string;
	settings?: Settings;
	systemPrompt: SystemPrompt;
	providerName: ProviderName;
	toolRegistry: ToolRegistry;
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
	responseFormatAgent,
	chatMessageManager,
	responseFormatSendMessage,
}: IParams): Promise<ModelResponse> => {
	const responseFormat = responseFormatSendMessage || responseFormatAgent;
	const tools = toolRegistry.getToolSchemas<OpenAI.Responses.Tool>({
		providerName,
	});
	const chatMessages =
		chatMessageManager.getMessages<OpenAI.Responses.ResponseOutputItem>();

	const chatParams = buildChatParams({
		model,
		tools,
		settings,
		chatMessages,
		systemPrompt,
		responseFormat,
	});

	const rawResponse = (await sdk.responses.create(
		chatParams,
	)) as OpenAI.Responses.Response;

	const response = toModelResponse({ response: rawResponse });

	return response;
};
