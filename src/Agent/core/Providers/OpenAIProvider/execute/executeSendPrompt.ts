import OpenAI from 'openai';
import { Role } from '@Agent';
import { Agent } from '@Agent';
import type { IModelResponse } from '@Agent/common/interfaces';
import { toModelResponse } from '@Agent/core/providers/OpenAIProvider/adapters/toModelResponse';

export interface IParams {
	agent: Agent;
}

export const executeSendPrompt = async ({
	agent,
}: IParams): Promise<IModelResponse> => {
	const sdk = agent.provider.sdk as OpenAI;

	const systemPromptMessage = {
		role: Role.System,
		content: agent.systemPrompt.getPrompt(),
	};

	const rawResponse = (await sdk.chat.completions.create({
		messages: [
			systemPromptMessage,
			...(agent.chatMessageManager.getMessages() as OpenAI.ChatCompletionMessageParam[]),
		],
		model: agent.provider.model,
		max_tokens: agent.provider.maxTokens,
		tools: agent.tools?.map((tool) =>
			tool.getSchema({ provider: agent.provider.name }),
		) as OpenAI.ChatCompletionTool[],
	})) as OpenAI.Chat.Completions.ChatCompletion;

	const response = toModelResponse({ response: rawResponse });

	return response;
};
