import { ToolRegistry } from '@core/ToolRegistry';
import { ProviderName } from '@sparrowstack/core';
import { State } from '@agent/common/enums/State';
import type { Content } from '@google/generative-ai';
import type { Settings } from '@agent/common/interfaces';
import { SystemPrompt } from '@sparrowstack/system-prompt';
import { ChatMessageManager } from '@sparrowstack/chat-message-manager';
import type { ModelResponse } from '@core/providers/BaseProvider/common/interfaces';
import { toModelResponse } from '@core/providers/GoogleGenerativeAIProvider/adapters';
import {
	buildChatParams,
	buildModelParams,
} from '@core/providers/GoogleGenerativeAIProvider/common/utils';
import {
	GoogleGenerativeAI,
	type FunctionDeclarationsTool,
} from '@google/generative-ai';

export interface IParams {
	model: string;
	state?: State;
	settings?: Settings;
	sdk: GoogleGenerativeAI;
	toolRegistry: ToolRegistry;
	systemPrompt: SystemPrompt;
	providerName: ProviderName;
	chatMessageManager: ChatMessageManager;
}

export const sendPrompt = async ({
	sdk,
	model,
	state,
	settings,
	systemPrompt,
	toolRegistry,
	providerName,
	chatMessageManager,
}: IParams): Promise<ModelResponse> => {
	const messages = chatMessageManager.getMessages<Content>();
	const systemInstruction = systemPrompt.getPrompt<Content>({ providerName });
	const tools = toolRegistry.getToolSchemas<FunctionDeclarationsTool>({
		providerName,
	});
	const isToolCall = state === State.ToolCallResponse;

	// TODO: Instantiate in Provider?

	// Build SDK Model
	const modelParams = buildModelParams({ model, tools });
	const sdkModel = sdk.getGenerativeModel(modelParams);

	// Build SDK Chat
	const chatParams = buildChatParams({
		settings,
		isToolCall,
		systemInstruction,
		history: messages,
	});
	const sdkChat = sdkModel.startChat(chatParams);

	// Send Message
	const lastMessage = messages[messages.length - 1];
	const userMessage = lastMessage.parts[0].text as string;
	const rawResponse = await sdkChat.sendMessage(userMessage);

	// Format Response
	const response = toModelResponse({ response: rawResponse });

	// const history = await sdkChat.getHistory();

	return response;
};
