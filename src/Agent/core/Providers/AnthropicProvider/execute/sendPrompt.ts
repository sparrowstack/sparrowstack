import { BaseLLM } from '@Agent/core/BaseLLM';
import { Anthropic } from '@anthropic-ai/sdk';

export interface IParams {
	llm: BaseLLM;
}

export const sendPrompt = async ({
	llm,
}: IParams): Promise<Anthropic.Messages.Message> => {
	const sdk = llm.providerSDK as Anthropic;

	const response = (await sdk.messages.create({
		messages:
			llm.chatMessageManager.getMessages() as unknown as Anthropic.MessageParam[],
		model: llm.model,
		max_tokens: llm.maxTokens,
		system: llm.systemPrompt.getPrompt(),
		tools: llm.tools?.map((tool) =>
			tool.getSchema({ provider: llm.provider }),
		) as Anthropic.Tool[],
	})) as Anthropic.Messages.Message;

	return response;
};
