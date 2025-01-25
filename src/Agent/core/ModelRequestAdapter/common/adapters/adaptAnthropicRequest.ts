import { BaseLLM } from '@BaseLLM';
import { Anthropic } from '@anthropic-ai/sdk';

interface IParams {
	llm: BaseLLM;
}

export const adaptAnthropicRequest = async ({
	llm,
}: IParams): Promise<Anthropic.Messages.Message> => {
	const sdk = llm.sdk as Anthropic;

	const response = (await sdk.messages.create({
		messages:
			llm.chatMessageManager.getMessages() as Anthropic.MessageParam[],
		model: llm.model,
		max_tokens: llm.maxTokens,
		system: llm.systemPrompt.getPrompt(),
		// ToolManager.getTools({ provider: llm.provider })
		tools: llm.tools?.map((tool) =>
			tool.getSchema({ provider: llm.provider }),
		) as Anthropic.Tool[],
	})) as Anthropic.Messages.Message;

	return response;
};
