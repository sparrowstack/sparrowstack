import { ToolRegistry } from '@core/ToolRegistry';
import { ProviderName } from '@sparrowstack/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SystemPrompt } from '@sparrowstack/system-prompt';
import { ChatMessageManager } from '@core/ChatMessageManager';
import type { IModelResponse } from '@core/providers/BaseProvider/common/interfaces';
import {
	toChatHistory,
	toModelResponse,
	toSystemInsruction,
} from '@core/providers/GoogleGenerativeAIProvider/adapters';

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
	// providerName,
	chatMessageManager,
}: IParams): Promise<IModelResponse> => {
	const messages = chatMessageManager.getMessages();
	const history = toChatHistory({ messages });
	const systemInstruction = toSystemInsruction({ systemPrompt });

	// const tools = toolRegistry.getToolSchemas({
	// 	providerName,
	// }) as Anthropic.Tool[];

	const sdkModel = sdk.getGenerativeModel({ model });
	const sdkChat = sdkModel.startChat({
		history,
		systemInstruction,
	});

	const lastMessage = messages[messages.length - 1];
	const userMessage = lastMessage.content as string;
	const rawResponse = await sdkChat.sendMessage(userMessage);

	const response = toModelResponse({ response: rawResponse });

	return response;
};
