import { Anthropic } from '@anthropic-ai/sdk';
import { BaseLLM } from '@Agent/core/BaseLLM';
import type { IModelResponse } from '@Agent/common/interfaces';
import { toModelResponse } from '@Agent/core/providers/AnthropicProvider/adapters/toModelResponse';

export interface IParams {
	llm: BaseLLM;
}

export const sendPrompt = async ({ llm }: IParams): Promise<IModelResponse> => {
	const sdk = llm.provider.sdk as Anthropic;

	const rawResponse = (await sdk.messages.create({
		messages:
			llm.chatMessageManager.getMessages() as unknown as Anthropic.MessageParam[],
		model: llm.provider.model,
		max_tokens: llm.maxTokens,
		system: llm.systemPrompt.getPrompt(),
		tools: llm.tools?.map((tool) =>
			tool.getSchema({ provider: llm.provider.name }),
		) as Anthropic.Tool[],
	})) as Anthropic.Messages.Message;

	const response = toModelResponse({ response: rawResponse });

	return response;
};
