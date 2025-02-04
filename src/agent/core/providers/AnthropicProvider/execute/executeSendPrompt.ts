import { SystemPrompt } from '@system-prompt';
import { Anthropic } from '@anthropic-ai/sdk';
import { ToolRegistry } from '@agent/core/ToolRegistry';
import { ChatMessageManager } from '@agent/core/ChatMessageManager';
import type { IModelResponse } from '@agent/core/providers/BaseProvider/common/interfaces';
import { ProviderName } from '@agent/core/providers/BaseProvider/common/enums/ProviderName';
import { toModelResponse } from '@agent/core/providers/AnthropicProvider/adapters/toModelResponse';

export interface IParams {
	model: string;
	sdk: Anthropic;
	maxTokens: number;
	toolRegistry: ToolRegistry;
	systemPrompt: SystemPrompt;
	providerName: ProviderName;
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
	const tools = toolRegistry.getToolSchemas({
		providerName,
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
