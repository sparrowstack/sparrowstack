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
	systemPrompt: SystemPrompt;
	providerName: ProviderName;
	toolRegistry: IToolRegistry;
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
	const system = systemPrompt.getPrompt();
	const messages =
		chatMessageManager.getMessages() as unknown as Anthropic.MessageParam[];
	// Re-evaluate tool calls on each 'executeSendPrompt' call,
	// if tool call doesn't pass validation won't be included
	// in the tools array
	// TODO: toolRegistry.getTools();
	// TODO: toolRegistry.getToolByName();
	const tools = Object.keys(toolRegistry).map((toolName) => {
		const tool = toolRegistry[toolName];
		return tool.getSchema({ providerName });
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
