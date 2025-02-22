// @ts-nocheck
import { ToolRegistry } from '@core/ToolRegistry';
import { ProviderName } from '@sparrowstack/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SystemPrompt } from '@sparrowstack/system-prompt';
import { ChatMessageManager } from '@core/ChatMessageManager';
import type { IModelResponse } from '@core/providers/BaseProvider/common/interfaces';
import { toModelResponse } from '@core/providers/GoogleGenerativeAIProvider/adapters/toModelResponse';

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
	toolRegistry,
	providerName,
	chatMessageManager,
}: IParams): Promise<IModelResponse> => {
	const sdkModel = sdk.getGenerativeModel({ model });
	const systemInstruction = systemPrompt.getPrompt();
	const messages = chatMessageManager.getMessages();
	// const tools = toolRegistry.getToolSchemas({
	// 	providerName,
	// }) as Anthropic.Tool[];
	const sdkChat = sdkModel.startChat({
		history: [],
		// systemInstruction,
	});

	const message = messages[messages.length - 1];
	const googleMessage = {
		role: message.role,
		parts: [
			{
				text: message.content,
			},
		],
	};

	const rawResponse = await sdkChat.sendMessage(message.content);

	const response = toModelResponse({ response: rawResponse });

	return response;
};
