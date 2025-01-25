import { Anthropic } from '@anthropic-ai/sdk';
import { BaseLLM } from '@Agent/core/llms/BaseLLM/BaseLLM';
import { ModelResponseAdapter } from '@Agent/core/ModelResponseAdapter/ModelResponseAdapter';

interface IParams {
	llm: BaseLLM;
	anthropic: Anthropic;
}

// TODO: executeLLMRequest
export const sendContextToLLM = async ({ llm, anthropic }: IParams) => {
	const rawResponse = await anthropic.messages.create({
		messages:
			llm.chatMessageManager.getMessages() as Anthropic.MessageParam[],
		model: llm.model,
		max_tokens: llm.maxTokens,
		system: llm.systemPrompt.getPrompt(),
		tools: llm.tools?.map((tool) =>
			tool.getSchema({ provider: llm.provider }),
		) as Anthropic.Tool[],
	});

	const modelResponse = ModelResponseAdapter.adapt({
		rawResponse,
		provider: llm.provider,
	});

	return modelResponse;
};
