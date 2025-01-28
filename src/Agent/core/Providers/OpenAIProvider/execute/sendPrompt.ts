import OpenAI from 'openai';
import { Role } from '@Agent';
import { BaseLLM } from '@Agent/core/BaseLLM';
import type { IModelResponse } from '@Agent/common/interfaces';
import { toModelResponse } from '@Agent/core/providers/OpenAIProvider/adapters/toModelResponse';

export interface IParams {
	llm: BaseLLM;
}

export const sendPrompt = async ({ llm }: IParams): Promise<IModelResponse> => {
	const sdk = llm.provider.sdk as OpenAI;

	const systemPromptMessage = {
		role: Role.System,
		content: llm.systemPrompt.getPrompt(),
	};

	const rawResponse = (await sdk.chat.completions.create({
		messages: [
			systemPromptMessage,
			...(llm.chatMessageManager.getMessages() as OpenAI.ChatCompletionMessageParam[]),
		],
		model: llm.provider.model,
		max_tokens: llm.maxTokens,
		tools: llm.tools?.map((tool) =>
			tool.getSchema({ provider: llm.provider.name }),
		) as OpenAI.ChatCompletionTool[],
	})) as OpenAI.Chat.Completions.ChatCompletion;

	const response = toModelResponse({ response: rawResponse });

	return response;
};
