import OpenAI from 'openai';
import { ToolRegistry } from '@core/ToolRegistry';
import { Role, ProviderName } from '@sparrowstack/core';
import { SystemPrompt } from '@sparrowstack/system-prompt';
import type { ChatMessageManager } from '@sparrowstack/chat-message-manager';
import type { ModelResponse } from '@core/providers/BaseProvider/common/interfaces';
import { toModelResponse } from '@core/providers/OpenAIProvider/adapters/toModelResponse';

export interface IParams {
	sdk: OpenAI;
	model: string;
	maxTokens: number;
	systemPrompt: SystemPrompt;
	providerName: ProviderName;
	toolRegistry: ToolRegistry;
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
}: IParams): Promise<ModelResponse> => {
	const systemPromptMessage = {
		role: Role.System,
		content: systemPrompt.getPrompt(),
	} as OpenAI.ChatCompletionMessageParam;
	const chatMessages =
		chatMessageManager.getMessages<OpenAI.ChatCompletionMessageParam>();
	const messages = [systemPromptMessage, ...chatMessages];
	const tools = toolRegistry.getToolSchemas<OpenAI.ChatCompletionTool>({
		providerName,
	});

	const rawResponse = (await sdk.chat.completions.create({
		model,
		tools,
		messages,
		max_tokens: maxTokens,
	})) as OpenAI.Chat.Completions.ChatCompletion;

	const response = toModelResponse({ response: rawResponse });

	return response;
};
