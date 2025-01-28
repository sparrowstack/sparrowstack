import type { Agent } from '@Agent';
import type { IModelResponse } from '@Agent/common/interfaces';

export class ToolCallManager {
	static async handleToolCalls({
		agent,
		responseMessage,
	}: {
		agent: Agent;
		responseMessage: IModelResponse;
	}) {
		let toolCallResponseMessage: IModelResponse | null = null;

		if (
			Array.isArray(responseMessage.toolCalls) &&
			responseMessage.toolCalls.length > 0
		) {
			agent.interactionLogger.logModelResponse({
				message: responseMessage,
			});

			const assistantToolCallRequestMessage =
				agent.provider.adapters.toToolCallRequestMessage({
					responseMessage,
				});

			// ToolCallMessageRequestManager.add()
			agent.chatMessageManager.addToMessages({
				message: assistantToolCallRequestMessage,
			});

			// Execute tool calls
			const toolCallResults = await Promise.all(
				responseMessage.toolCalls.map(async (toolCall) => {
					const { id, name, parameters } = toolCall;
					const toolCallFunction = agent.functions![name];
					// TODO: JSON.parse(toolCall.function.arguments);
					const result = await toolCallFunction(parameters);

					return { id, result };
				}),
			);

			const assistantToolCallResponseMessages =
				agent.provider.adapters.toToolCallResponseMessages({
					toolCallResults,
				});

			// ToolCallMessageResponseManager.add()
			assistantToolCallResponseMessages.forEach((message) => {
				agent.chatMessageManager.addToMessages({
					message,
				});
			});

			// Log latest messages
			agent.interactionLogger.logChatMessages();

			toolCallResponseMessage = await agent.provider.sendPrompt({
				agent,
			});

			agent.interactionLogger.logModelResponse({
				message: toolCallResponseMessage,
			});
		}

		return toolCallResponseMessage;
	}
}
