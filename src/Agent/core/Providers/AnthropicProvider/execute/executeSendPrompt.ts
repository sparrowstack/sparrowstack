import { Tool } from '@Tool';
import { ProviderName } from '@Agent';
import { SystemPrompt } from '@SystemPrompt';
import { Anthropic } from '@anthropic-ai/sdk';
import { ChatMessageManager } from '@Agent/core/ChatMessageManager';
import type { IModelResponse } from '@Agent/core/providers/BaseProvider/common/interfaces';
import { toModelResponse } from '@Agent/core/providers/AnthropicProvider/adapters/toModelResponse';

export interface IParams {
	tools: Tool[];
	model: string;
	sdk: Anthropic;
	name: ProviderName;
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
	const system = systemPrompt.getPrompt();
	const messages =
		chatMessageManager.getMessages() as unknown as Anthropic.MessageParam[];
	// Re-call getSchema on each 'executeSendPrompt' call,
	// if tool call has exceeded maxCount it won't be included
	// in the tools array
	const tools = toolInstances?.map((tool) =>
		tool.getSchema({ providerName: name }),
	) as Anthropic.Tool[];

	const rawResponse = (await sdk.messages.create({
		model,
		tools,
		system,
		messages,
		max_tokens: maxTokens,
	})) as Anthropic.Messages.Message;

	const response = toModelResponse({ response: rawResponse });

	return response;
};
