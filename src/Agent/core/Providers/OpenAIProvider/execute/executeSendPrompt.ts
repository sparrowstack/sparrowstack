import OpenAI from 'openai';
import { SystemPrompt } from '@SystemPrompt';
import { Role } from '@Agent/core/ChatMessage/common/enums';
import { ChatMessageManager } from '@Agent/core/ChatMessageManager';
import type { IToolRegistry } from '@Agent/core/ToolRegistryFactory/common/interfaces';
import type { IModelResponse } from '@Agent/core/providers/BaseProvider/common/interfaces';
import { ProviderName } from '@Agent/core/providers/BaseProvider/common/enums/ProviderName';
import { toModelResponse } from '@Agent/core/providers/OpenAIProvider/adapters/toModelResponse';

export interface IParams {
	sdk: OpenAI;
	model: string;
	name: ProviderName;
	maxTokens: number;
	systemPrompt: SystemPrompt;
	toolRegistry: IToolRegistry;
	chatMessageManager: ChatMessageManager;
}

export const executeSendPrompt = async ({
	sdk,
	name,
	model,
	maxTokens,
	systemPrompt,
	toolRegistry,
	chatMessageManager,
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
	const tools = Object.keys(toolRegistry)
		?.filter((toolName) => {
			const tool = toolRegistry[toolName];

			return (
				!tool.validate ||
				tool.validate({ callCount: tool.callCount, context: {} })
			);
		})
		.map((toolName) => {
			const tool = toolRegistry[toolName];

			return tool.getSchema({ providerName: name });
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
