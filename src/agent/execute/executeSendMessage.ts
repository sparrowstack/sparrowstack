import type { AIProvider } from '@agent/core/providers/BaseProvider/common/types';
import type { ToolCallManager } from '@agent/core/ToolCallManager/ToolCallManager';
import type { InteractionLogger } from '@agent/core/InteractionLogger/InteractionLogger';
import type { ChatMessageManager } from '@agent/core/ChatMessageManager/ChatMessageManager';

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

	const responseMessage = toolCallResponseMessage || modelResponseMessage;

	chatMessageManager.addAssistantMessage({
		text: responseMessage.text,
	});

	// Info log the context window sent to the LLM
	interactionLogger.logContextWindow();

	return responseMessage;
};
