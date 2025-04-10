import OpenAI from 'openai';
import { ProviderName } from '@sparrowstack/core';
import type { Settings } from '@agent/common/interfaces';
import { SystemPrompt } from '@sparrowstack/system-prompt';
import { ToolRegistryManager } from '@core/ToolRegistryManager';
import type { ChatMessageManager } from '@sparrowstack/chat-message-manager';
import type { ModelResponse } from '@core/providers/BaseProvider/common/interfaces';
import { buildChatParams } from '@core/providers/OpenAIProvider/methods/sendPrompt/common/utils';
import { toModelResponse } from '@core/providers/OpenAIProvider/common/adapters/toModelResponse';
import type { StructuredOutput } from '@sparrowstack/structured-output';

export interface Params {
	sdk: OpenAI;
	model: string;
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
	const tools = toolRegistryManager.getToolSchemas<OpenAI.Responses.Tool>({
		providerName,
	});
	const chatMessages =
		chatMessageManager.getMessages<OpenAI.Responses.ResponseOutputItem>();
	const responseFormatAgent = structuredOutputAgent?.getResponseFormat<
		Record<string, any>
	>({ providerName });
	const responseFormatSendMessage =
		structuredOutputSendMessage?.getResponseFormat<Record<string, any>>({
			providerName,
		});
	const responseFormat = responseFormatSendMessage || responseFormatAgent;
	const responseFormatName =
		structuredOutputSendMessage?.name || responseFormatAgent?.name;

	const chatParams = buildChatParams({
		model,
		tools,
		settings,
		chatMessages,
		systemPrompt,
		responseFormat,
		responseFormatName,
	});

	const rawResponse = (await sdk.responses.create(
		chatParams,
	)) as OpenAI.Responses.Response;

	const response = toModelResponse({ response: rawResponse });

	return response;
};
