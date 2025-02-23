import { ToolRegistry } from '@core/ToolRegistry';
import { ProviderName } from '@sparrowstack/core';
import type { Content } from '@google/generative-ai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SystemPrompt } from '@sparrowstack/system-prompt';
import { ChatMessageManager } from '@sparrowstack/chat-message-manager';
import type { IModelResponse } from '@core/providers/BaseProvider/common/interfaces';
import { toModelResponse } from '@core/providers/GoogleGenerativeAIProvider/adapters';

export interface IParams {
	model: string;
	maxTokens: number;
	sdk: GoogleGenerativeAI;
	toolRegistry: ToolRegistry;
	systemPrompt: SystemPrompt;
	providerName: ProviderName;
	chatMessageManager: ChatMessageManager;
}

export const executeSendPrompt = async ({
	sdk,
	model,
	// maxTokens,
	systemPrompt,
	// toolRegistry,
	providerName,
	chatMessageManager,
}: IParams): Promise<IModelResponse> => {
	const messages = chatMessageManager.getMessages<Content>();
	const systemInstruction = systemPrompt.getPrompt<Content>({ providerName });

	// const tools = toolRegistry.getToolSchemas({
	// 	providerName,
	// }) as Anthropic.Tool[];

	const sdkModel = sdk.getGenerativeModel({ model });
	const sdkChat = sdkModel.startChat({
		history: messages,
		systemInstruction,
	});

	const lastMessage = messages[messages.length - 1];
	const userMessage = lastMessage.parts[0].text as string;

	const rawResponse = await sdkChat.sendMessage(userMessage);

	const response = toModelResponse({ response: rawResponse });

	return response;
};
