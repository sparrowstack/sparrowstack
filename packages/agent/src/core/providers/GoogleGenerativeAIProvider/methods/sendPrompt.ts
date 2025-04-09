import type { Part } from '@google/generative-ai';
import { ProviderName } from '@sparrowstack/core';
import type { Settings } from '@agent/common/interfaces';
import { SystemPrompt } from '@sparrowstack/system-prompt';
import { ToolRegistryManager } from '@core/ToolRegistryManager';
import { ChatMessageManager } from '@sparrowstack/chat-message-manager';
import { Role } from '@core/providers/GoogleGenerativeAIProvider/common/enums';
import type { Content /*GenerateContentResult*/ } from '@google/generative-ai';
import type { ModelResponse } from '@core/providers/BaseProvider/common/interfaces';
import { toModelResponse } from '@core/providers/GoogleGenerativeAIProvider/common/adapters';
import {
	buildChatParams,
	buildModelParams,
} from '@core/providers/GoogleGenerativeAIProvider/methods/common/utils';
import {
	GoogleGenerativeAI,
	type FunctionDeclarationsTool,
} from '@google/generative-ai';

export interface Params {
	model: string;
	settings?: Settings;
	sdk: GoogleGenerativeAI;
	responseFormatAgent: any;
	systemPrompt: SystemPrompt;
	providerName: ProviderName;
	responseFormatSendMessage?: any;
	chatMessageManager: ChatMessageManager;
	toolRegistryManager: ToolRegistryManager;
}

export const sendPrompt = async ({
	sdk,
	model,
	settings,
	systemPrompt,
	toolRegistryManager,
	providerName,
	chatMessageManager,
	responseFormatAgent,
	responseFormatSendMessage,
}: Params): Promise<ModelResponse> => {
	// Get Messages
	const messages = chatMessageManager.getMessages<Content>();
	const updatedMessages = [...messages];
	const lastChatMessage = updatedMessages.pop();
	const isUserMessage = lastChatMessage?.role === Role.User;
	const isFunctionMessage = lastChatMessage?.role === Role.FunctionCall;

	// Build Model SDK
	const tools = toolRegistryManager.getToolSchemas<FunctionDeclarationsTool>({
		providerName,
	});
	const modelParams = buildModelParams({ model, tools });
	const sdkModel = sdk.getGenerativeModel(modelParams);
	const responseFormat = responseFormatSendMessage || responseFormatAgent;

	// Build Chat SDK
	const systemInstruction = systemPrompt.getPrompt<Content>({ providerName });
	const chatParams = buildChatParams({
		settings,
		responseFormat,
		systemInstruction,
		history: updatedMessages,
	});
	const sdkChat = sdkModel.startChat(chatParams);

	// Given the way Google Generative AI works,
	// we need to handle user and function call messages differently
	// Additionally, since we can't pass the fulll history to the SDK,
	// like OpenAI and Anthropic, we need to manually build the chat
	// params/history and send the "latest message"
	let rawResponse: any;

	if (isUserMessage) {
		const chatMessage = lastChatMessage?.parts[0].text as string;
		rawResponse = await sdkChat.sendMessage(chatMessage);
	} else if (isFunctionMessage) {
		const chatMessage = lastChatMessage?.parts as Part[];
		rawResponse = await sdkChat.sendMessage(chatMessage);
	}

	// Format Response
	const response = toModelResponse({ response: rawResponse });

	return response;
};
