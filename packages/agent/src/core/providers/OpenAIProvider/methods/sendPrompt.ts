import OpenAI from 'openai';
import { ToolRegistry } from '@core/ToolRegistry';
import { ProviderName, Model } from '@sparrowstack/core';
import { SystemPrompt } from '@sparrowstack/system-prompt';
import { Role } from '@core/providers/OpenAIProvider/common/enums/Role';
import type { ChatMessageManager } from '@sparrowstack/chat-message-manager';
import type { ModelResponse } from '@core/providers/BaseProvider/common/interfaces';
import { toModelResponse } from '@core/providers/OpenAIProvider/adapters/toModelResponse';

interface IChatCompletionCreateParams {
	model: string;
	tools: OpenAI.ChatCompletionTool[];
	messages: OpenAI.ChatCompletionMessageParam[];
	max_tokens?: number;
	max_completion_tokens?: number;
}

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

	const chatCompletionCreateParams: IChatCompletionCreateParams = {
		model,
		tools,
		messages,
	};

	if (model === Model.OpenAI.o3Mini) {
		chatCompletionCreateParams.max_completion_tokens = maxTokens;
	} else {
		chatCompletionCreateParams.max_tokens = maxTokens;
	}

	const rawResponse = (await sdk.chat.completions.create(
		chatCompletionCreateParams,
	)) as OpenAI.Chat.Completions.ChatCompletion;

	const response = toModelResponse({ response: rawResponse });

	return response;
};
