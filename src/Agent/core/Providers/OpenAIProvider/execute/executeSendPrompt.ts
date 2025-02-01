import OpenAI from 'openai';
import { SystemPrompt } from '@SystemPrompt';
import { Role } from '@Agent/core/ChatMessage/common/enums';
import { ChatMessageManager } from '@Agent/core/ChatMessageManager';
import { State } from '@Agent/core/providers/BaseProvider/common/enums';
import { selectToolCalls } from '@Agent/core/providers/BaseProvider/common/utils';
import type { IToolRegistry } from '@Agent/core/ToolRegistryFactory/common/interfaces';
import type { IModelResponse } from '@Agent/core/providers/BaseProvider/common/interfaces';
import { ProviderName } from '@Agent/core/providers/BaseProvider/common/enums/ProviderName';
import { toModelResponse } from '@Agent/core/providers/OpenAIProvider/adapters/toModelResponse';

export interface IParams {
	sdk: OpenAI;
	model: string;
	state?: State;
	maxTokens: number;
	systemPrompt: SystemPrompt;
	providerName: ProviderName;
	toolRegistry: IToolRegistry;
	chatMessageManager: ChatMessageManager;
}

export const executeSendPrompt = async ({
	sdk,
	model,
	state,
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
	// Re-evaluate tool calls on each 'executeSendPrompt' call,
	// if tool call doesn't pass validation won't be included
	// in the tools array
	const tools = (await selectToolCalls({
		state,
		model,
		toolRegistry,
		providerName,
		systemPrompt,
		chatMessageManager,
	})) as OpenAI.ChatCompletionTool[];

	const rawResponse = (await sdk.chat.completions.create({
		model,
		tools,
		messages,
		max_tokens: maxTokens,
	})) as OpenAI.Chat.Completions.ChatCompletion;

	const response = toModelResponse({ response: rawResponse });

	return response;
};
