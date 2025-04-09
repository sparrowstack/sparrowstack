import type { Settings } from '@agent/common/interfaces';
import type { ToolCallManager } from '@core/ToolCallManager/ToolCallManager';
import type { ChatMessageManager } from '@sparrowstack/chat-message-manager';
import type { Provider } from '@core/providers/BaseProvider/common/types/Provider';
import type { InteractionLogger } from '@core/InteractionLogger/InteractionLogger';

interface Params {
	message: string;
	provider: Provider;
	settings?: Settings;
	toolCallManager: ToolCallManager;
	interactionLogger: InteractionLogger;
	chatMessageManager: ChatMessageManager;
	responseFormatSendMessage?: any;
}

export const sendMessage = async ({
	message,
	provider,
	toolCallManager,
	interactionLogger,
	chatMessageManager,
	responseFormatSendMessage,
}: Params) => {
	chatMessageManager.addUserMessage({ text: message });

	const modelResponseMessage = await provider.sendPrompt({
		responseFormatSendMessage,
	});

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
