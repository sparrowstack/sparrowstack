import { Anthropic } from '@anthropic-ai/sdk';
import { ToolRegistry } from '@core/ToolRegistry';
import { ProviderName } from '@sparrowstack/core';
import { State } from '@agent/common/enums/State';
import type { Settings } from '@agent/common/interfaces';
import { SystemPrompt } from '@sparrowstack/system-prompt';
import { ChatMessageManager } from '@sparrowstack/chat-message-manager';
import type { ModelResponse } from '@core/providers/BaseProvider/common/interfaces';
import { toModelResponse } from '@core/providers/AnthropicProvider/common/adapters/toModelResponse';
import { buildMessageParams } from '@core/providers/AnthropicProvider/common/utils/buildMessageParams';

export interface IParams {
	state?: State;
	model: string;
	sdk: Anthropic;
	settings?: Settings;
	toolRegistry: ToolRegistry;
	systemPrompt: SystemPrompt;
	providerName: ProviderName;
	structuredOutput: any;
	chatMessageManager: ChatMessageManager;
}

export const sendPrompt = async ({
	sdk,
	model,
	settings,
	systemPrompt,
	toolRegistry,
	providerName,
	structuredOutput,
	chatMessageManager,
}: IParams): Promise<ModelResponse> => {
	const system = systemPrompt.getPrompt();
	const messages = chatMessageManager.getMessages<Anthropic.MessageParam>();
	const tools = toolRegistry.getToolSchemas<Anthropic.Tool>({
		providerName,
	});
	const messageParams = buildMessageParams({
		model,
		tools,
		system,
		messages,
		settings,
		structuredOutput,
	});

	const rawResponse = (await sdk.messages.create(
		messageParams,
	)) as Anthropic.Messages.Message;

	const response = toModelResponse({ response: rawResponse });

	return response;
};
