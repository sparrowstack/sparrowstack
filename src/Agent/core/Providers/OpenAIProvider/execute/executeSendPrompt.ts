import OpenAI from 'openai';
import { Tool } from '@Tool';
import { Provider, Role } from '@Agent';
import { SystemPrompt } from '@SystemPrompt';
import type { IModelResponse } from '@Agent/common/interfaces';
import { ChatMessageManager } from '@Agent/core/ChatMessageManager';
import { toModelResponse } from '@Agent/core/providers/OpenAIProvider/adapters/toModelResponse';

export interface IParams {
	sdk: OpenAI;
	model: string;
	tools: Tool[];
	name: Provider;
	maxTokens: number;
	systemPrompt: SystemPrompt;
	chatMessageManager: ChatMessageManager;
}

export const executeSendPrompt = async ({
	sdk,
	name,
	model,
	maxTokens,
	systemPrompt,
	chatMessageManager,
	tools: toolInstances,
}: IParams): Promise<IModelResponse> => {
	const systemPromptMessage = {
		role: Role.System,
		content: systemPrompt.getPrompt(),
	};
	const chatMessages =
		chatMessageManager.getMessages() as OpenAI.ChatCompletionMessageParam[];
	const messages = [systemPromptMessage, ...chatMessages];
	// Re-call getSchema on each 'executeSendPrompt' call,
	// if tool call has exceeded maxCount it won't be included
	// in the tools array
	const tools = toolInstances?.map((tool) =>
		tool.getSchema({ providerName: name }),
	) as OpenAI.ChatCompletionTool[];

	const rawResponse = (await sdk.chat.completions.create({
		model,
		tools,
		messages,
		max_tokens: maxTokens,
	})) as OpenAI.Chat.Completions.ChatCompletion;

	const response = toModelResponse({ response: rawResponse });

	return response;
};
