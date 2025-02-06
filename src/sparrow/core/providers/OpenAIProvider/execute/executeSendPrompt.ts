import OpenAI from 'openai';
import { SystemPrompt } from '@system-prompt';
import { ToolRegistry } from '@agent/core/ToolRegistry';
import { Role } from '@agent/core/ChatMessage/common/enums';
import { ChatMessageManager } from '@agent/core/ChatMessageManager';
import type { IModelResponse } from '@agent/core/providers/BaseProvider/common/interfaces';
import { ProviderName } from '@agent/core/providers/BaseProvider/common/enums/ProviderName';
import { toModelResponse } from '@agent/core/providers/OpenAIProvider/adapters/toModelResponse';

export interface IParams {
	sdk: OpenAI;
	model: string;
	maxTokens?: number;
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
		max_tokens: maxTokens ?? 4096,
	})) as OpenAI.Chat.Completions.ChatCompletion;

	const response = toModelResponse({ response: rawResponse });

	return response;
};
