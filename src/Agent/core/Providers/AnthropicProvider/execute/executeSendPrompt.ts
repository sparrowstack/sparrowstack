import { SystemPrompt } from '@SystemPrompt';
import { Anthropic } from '@anthropic-ai/sdk';
import { ChatMessageManager } from '@Agent/core/ChatMessageManager';
import type { IToolRegistry } from '@Agent/core/ToolRegistryFactory/common/interfaces';
import type { IModelResponse } from '@Agent/core/providers/BaseProvider/common/interfaces';
import { ProviderName } from '@Agent/core/providers/BaseProvider/common/enums/ProviderName';
import { toModelResponse } from '@Agent/core/providers/AnthropicProvider/adapters/toModelResponse';

export interface IParams {
	model: string;
	sdk: Anthropic;
	maxTokens: number;
	name: ProviderName;
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
	const system = systemPrompt.getPrompt();
	const messages =
		chatMessageManager.getMessages() as unknown as Anthropic.MessageParam[];
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
		}) as Anthropic.Tool[];

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
