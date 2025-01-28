import { Anthropic } from '@anthropic-ai/sdk';
import { Agent } from '@Agent';
import type { IModelResponse } from '@Agent/common/interfaces';
import { toModelResponse } from '@Agent/core/providers/AnthropicProvider/adapters/toModelResponse';

export interface IParams {
	agent: Agent;
}

export const executeSendPrompt = async ({
	agent,
}: IParams): Promise<IModelResponse> => {
	const sdk = agent.provider.sdk as Anthropic;

	const rawResponse = (await sdk.messages.create({
		messages:
			agent.chatMessageManager.getMessages() as unknown as Anthropic.MessageParam[],
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
