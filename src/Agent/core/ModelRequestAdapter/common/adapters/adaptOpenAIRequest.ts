import OpenAI from 'openai';
import { Role } from '@Agent';
import { BaseLLM } from '@BaseLLM';

interface IParams {
	llm: BaseLLM;
}

export const adaptOpenAIRequest = async ({
	llm,
}: IParams): Promise<OpenAI.Chat.Completions.ChatCompletion> => {
	const sdk = llm.sdk as OpenAI;

	const systemPromptMessage = {
		role: Role.System,
		content: llm.systemPrompt.getPrompt(),
	};

	const response = (await sdk.chat.completions.create({
		messages: [
			systemPromptMessage,
			...llm.chatMessageManager.getMessages(),
		],
		model: llm.model,
		max_tokens: llm.maxTokens,
		tools: llm.tools?.map((tool) =>
			tool.getSchema({ provider: llm.provider }),
		) as OpenAI.ChatCompletionTool[],
	})) as OpenAI.Chat.Completions.ChatCompletion;

	return response;
};
