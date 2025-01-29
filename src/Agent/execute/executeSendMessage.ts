import type { ToolCallManager } from '@Agent/core/ToolCallManager/ToolCallManager';
import type { InteractionLogger } from '@Agent/core/InteractionLogger/InteractionLogger';
import type { OpenAIProvider } from '@Agent/core/providers/OpenAIProvider/OpenAIProvider';
import type { ChatMessageManager } from '@Agent/core/ChatMessageManager/ChatMessageManager';
import type { AnthropicProvider } from '@Agent/core/providers/AnthropicProvider/AnthropicProvider';

interface IParams {
	message: string;
	toolCallManager: ToolCallManager;
	interactionLogger: InteractionLogger;
	chatMessageManager: ChatMessageManager;
	provider: OpenAIProvider | AnthropicProvider;
}

export const executeSendMessage = async ({
	message,
	provider,
	toolCallManager,
	interactionLogger,
	chatMessageManager,
}: IParams) => {
	chatMessageManager.addUserMessage({ text: message });

	interactionLogger.logContextWindow();

	const modelResponseMessage = await provider.sendPrompt();

	const toolCallResponseMessage = await toolCallManager.handleToolCalls({
		responseMessage: modelResponseMessage,
	});

	const responseMessage = toolCallResponseMessage || modelResponseMessage;

	chatMessageManager.addAssistantMessage({
		text: responseMessage.text,
	});

	return responseMessage;
};
