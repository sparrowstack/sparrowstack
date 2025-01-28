import { Agent } from '@Agent';
import { Anthropic } from '@anthropic-ai/sdk';
import type { IModelResponse } from '@Agent/common/interfaces';
import { ChatMessageManager } from '@Agent/core/ChatMessageManager';
import { toModelResponse } from '@Agent/core/providers/AnthropicProvider/adapters/toModelResponse';

export interface IParams {
	agent: Agent;
	chatMessageManager: ChatMessageManager;
}

export const executeSendPrompt = async ({
	agent,
	chatMessageManager,
}: IParams): Promise<IModelResponse> => {
	const sdk = agent.provider.sdk as Anthropic;

	const messages =
		chatMessageManager.getMessages() as unknown as Anthropic.MessageParam[];

	const rawResponse = (await sdk.messages.create({
		messages,
		model: agent.provider.model,
		max_tokens: agent.provider.maxTokens,
		system: agent.systemPrompt.getPrompt(),
		tools: agent.tools?.map((tool) =>
			tool.getSchema({ provider: agent.provider.name }),
		) as Anthropic.Tool[],
	})) as Anthropic.Messages.Message;

	const response = toModelResponse({ response: rawResponse });

	return response;
};
