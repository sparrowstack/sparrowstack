import { Anthropic } from '@anthropic-ai/sdk';
import { ProviderName } from '@sparrowstack/core';
import type { Settings } from '@agent/common/interfaces';
import { SystemPrompt } from '@sparrowstack/system-prompt';
import { ToolRegistryManager } from '@core/ToolRegistryManager';
import type { StructuredOutput } from '@sparrowstack/structured-output';
import { ChatMessageManager } from '@sparrowstack/chat-message-manager';
import type { ModelResponse } from '@core/providers/BaseProvider/common/interfaces';
import { toModelResponse } from '@core/providers/AnthropicProvider/common/adapters/toModelResponse';
import { buildMessageParams } from '@core/providers/AnthropicProvider/methods/common/utils/buildMessageParams';

export interface Params {
	model: string;
	sdk: Anthropic;
	settings?: Settings;
	systemPrompt: SystemPrompt;
	providerName: ProviderName;
	chatMessageManager: ChatMessageManager;
	toolRegistryManager: ToolRegistryManager;
	structuredOutputAgent?: StructuredOutput;
	structuredOutputSendMessage?: StructuredOutput;
}

export const sendPrompt = async ({
	sdk,
	model,
	settings,
	systemPrompt,
	providerName,
	chatMessageManager,
	toolRegistryManager,
	structuredOutputAgent,
	structuredOutputSendMessage,
}: Params): Promise<ModelResponse> => {
	const system = systemPrompt.getPrompt();
	const messages = chatMessageManager.getMessages<Anthropic.MessageParam>();
	const tools = toolRegistryManager.getToolSchemas<Anthropic.Tool>({
		providerName,
	});
	const responseFormatAgent = structuredOutputAgent?.getResponseFormat<
		Record<string, unknown>
	>({ providerName });
	const responseFormatSendMessage =
		structuredOutputSendMessage?.getResponseFormat<Record<string, unknown>>(
			{ providerName },
		);
	const responseFormat = responseFormatSendMessage || responseFormatAgent;
	const messageParams = buildMessageParams({
		model,
		tools,
		system,
		messages,
		settings,
		responseFormat,
	});

	const rawResponse = (await sdk.messages.create(
		messageParams,
	)) as Anthropic.Messages.Message;

	const response = toModelResponse({ response: rawResponse });

	return response;
};
