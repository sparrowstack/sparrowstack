import OpenAI from 'openai';
import { ToolRegistry } from '@core/ToolRegistry';
import { ProviderName } from '@sparrowstack/core';
import type { Settings } from '@agent/common/interfaces';
import { SystemPrompt } from '@sparrowstack/system-prompt';
import type { ChatMessageManager } from '@sparrowstack/chat-message-manager';
import type { ModelResponse } from '@core/providers/BaseProvider/common/interfaces';
import { buildChatParams } from '@core/providers/OpenAIProvider/methods/sendPrompt/utils';
import { toModelResponse } from '@core/providers/OpenAIProvider/common/adapters/toModelResponse';

export interface IParams {
	sdk: OpenAI;
	model: string;
	settings?: Settings;
	structuredOutput: any;
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
	structuredOutput,
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
		structuredOutput,
	});

	const rawResponse = (await sdk.chat.completions.create(
		chatParams,
	)) as OpenAI.Chat.Completions.ChatCompletion;

	const response = toModelResponse({ response: rawResponse });

	return response;
};
