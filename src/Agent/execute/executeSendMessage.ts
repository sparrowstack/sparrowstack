import type { AIProvider } from '@Agent/core/providers/BaseProvider/common/types';
import type { ToolCallManager } from '@Agent/core/ToolCallManager/ToolCallManager';
import type { InteractionLogger } from '@Agent/core/InteractionLogger/InteractionLogger';
import type { ChatMessageManager } from '@Agent/core/ChatMessageManager/ChatMessageManager';

interface IParams {
	message: string;
	provider: AIProvider;
	toolCallManager: ToolCallManager;
	interactionLogger: InteractionLogger;
	chatMessageManager: ChatMessageManager;
}

export const executeSendMessage = async ({
	message,
	provider,
	toolCallManager,
	interactionLogger,
	chatMessageManager,
}: IParams) => {
	chatMessageManager.addUserMessage({ text: message });

	const modelResponseMessage = await provider.sendPrompt();

	const toolCallResponseMessage = await toolCallManager.handleToolCalls({
		responseMessage: modelResponseMessage,
	});

	interactionLogger.logContextWindow();

	const responseMessage = toolCallResponseMessage || modelResponseMessage;

	chatMessageManager.addAssistantMessage({
		text: responseMessage.text,
	});

	return responseMessage;
};
