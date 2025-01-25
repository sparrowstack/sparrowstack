import { Anthropic } from '@anthropic-ai/sdk';
import { BaseLLM } from '@Agent/core/llms/BaseLLM';

interface IParams {
	llm: BaseLLM;
}

export const adaptAnthropicRequest = async ({ llm }: IParams) => {
	const sdk = llm.sdk as Anthropic;

	const response = await sdk.messages.create({
		messages:
			llm.chatMessageManager.getMessages() as Anthropic.MessageParam[],
		model: llm.model,
		max_tokens: llm.maxTokens,
		system: llm.systemPrompt.getPrompt(),
		// ToolManager.getTools({ provider: llm.provider })
		tools: llm.tools?.map((tool) =>
			tool.getSchema({ provider: llm.provider }),
		) as Anthropic.Tool[],
	});

	return response;
};
