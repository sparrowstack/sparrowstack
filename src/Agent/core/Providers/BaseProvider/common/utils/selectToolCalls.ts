import { SystemPrompt } from '@SystemPrompt';
import { ChatMessageManager } from '@Agent/core/ChatMessageManager';
import { State } from '@Agent/core/providers/BaseProvider/common/enums';
import type { IToolRegistry } from '@Agent/core/ToolRegistryFactory/common/interfaces';
import { ProviderName } from '@Agent/core/providers/BaseProvider/common/enums/ProviderName';

interface IParams {
	state?: State;
	model: string;
	toolRegistry: IToolRegistry;
	providerName: ProviderName;
	systemPrompt: SystemPrompt;
	chatMessageManager: ChatMessageManager;
}

export const selectToolCalls = async ({
	state,
	model,
	toolRegistry,
	providerName,
	systemPrompt,
	chatMessageManager,
}: IParams) => {
	// Create a context object that contains the current state of the chat/agent
	// This will be passed to tool validation functions
	const context = {
		model,
		provider: providerName,
		systemPrompt: systemPrompt.getPrompt(),
		messages: chatMessageManager.getMessages(),
	};

	const validTools = await Object.values(toolRegistry).reduce(
		async (accumulatorPromise, tool) => {
			// Wait for the previous iteration's promise to resolve
			const accumulator = await accumulatorPromise;
			const shouldRunValidate = state !== State.ReturningToolCallResults;
			let isValid = true;

			if (shouldRunValidate && tool.validate) {
				isValid = await tool.validate({
					context,
					callCount: tool.callCount,
				});
			}

			if (isValid) {
				accumulator.push(tool.getSchema({ providerName }));
			}

			return accumulator;
		},
		// Initialize the accumulator as an empty array with the correct type
		Promise.resolve(
			// This is an array of whatever type the getSchema method returns when called on any tool in the registry.
			[] as ReturnType<(typeof toolRegistry)[string]['getSchema']>[],
		),
	);

	// If we found valid tools, return them; otherwise return undefined
	const selectedTools = validTools.length > 0 ? validTools : undefined;

	return selectedTools;
};
