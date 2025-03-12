import OpenAI from 'openai';
import { ToolRegistry } from '@core/ToolRegistry';
import { ProviderName } from '@sparrowstack/core';
import type { Settings } from '@agent/common/interfaces';
import { SystemPrompt } from '@sparrowstack/system-prompt';
import type { ChatMessageManager } from '@sparrowstack/chat-message-manager';
import type { ModelResponse } from '@core/providers/BaseProvider/common/interfaces';
import { toModelResponse } from '@core/providers/OpenAIProvider/adapters/toModelResponse';
import { buildChatParams } from '@core/providers/OpenAIProvider/methods/sendPrompt/utils';

export interface IParams {
	sdk: OpenAI;
	model: string;
	settings?: Settings;
	systemPrompt: SystemPrompt;
	providerName: ProviderName;
	toolRegistry: ToolRegistry;
	chatMessageManager: ChatMessageManager;
}

export const sendPrompt = async ({
	sdk,
	model,
	settings,
	systemPrompt,
	toolRegistry,
	providerName,
	chatMessageManager,
}: IParams): Promise<ModelResponse> => {
	const tools = toolRegistry.getToolSchemas<OpenAI.ChatCompletionTool>({
		providerName,
	});
	const chatMessages =
		chatMessageManager.getMessages<OpenAI.ChatCompletionMessageParam>();

	const chatParams = buildChatParams({
		model,
		tools,
		settings,
		chatMessages,
		systemPrompt,
	});

	const rawResponse = (await sdk.chat.completions.create(
		chatParams,
	)) as OpenAI.Chat.Completions.ChatCompletion;

	const response = toModelResponse({ response: rawResponse });

	return response;
};
