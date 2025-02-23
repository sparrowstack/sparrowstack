import OpenAI from 'openai';
import { ToolRegistry } from '@core/ToolRegistry';
import { SystemPrompt } from '@sparrowstack/system-prompt';
import { Role, ProviderName, ChatMessageManager } from '@sparrowstack/core';
import type { IModelResponse } from '@core/providers/BaseProvider/common/interfaces';
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

export const executeSendPrompt = async ({
	sdk,
	model,
	maxTokens,
	systemPrompt,
	toolRegistry,
	providerName,
	chatMessageManager,
}: IParams): Promise<IModelResponse> => {
	const systemPromptMessage = {
		role: Role.System,
		content: systemPrompt.getPrompt(),
	};
	const chatMessages =
		chatMessageManager.getMessages() as OpenAI.ChatCompletionMessageParam[];
	const messages = [systemPromptMessage, ...chatMessages];
	const tools = toolRegistry.getToolSchemas({
		providerName,
	}) as OpenAI.ChatCompletionTool[];

	const rawResponse = (await sdk.chat.completions.create({
		model,
		tools,
		messages,
		max_tokens: maxTokens,
	})) as OpenAI.Chat.Completions.ChatCompletion;

	const response = toModelResponse({ response: rawResponse });

	return response;
};
