import OpenAI from 'openai';
import { Role } from '@Agent/common/enums';
import { BaseLLM } from '@Agent/core/llms/BaseLLM/BaseLLM';
import { convertOpenAIMessageToLLMResponseMessage } from '@Agent/core/llms/OpenAILLM/common/utils/convertOpenAIMessageToLLMResponseMessage';

interface IParams {
	llm: BaseLLM;
	openai: OpenAI;
}

export const sendContextToLLM = async ({ llm, openai }: IParams) => {
	const systemPromptMessage = {
		role: Role.System,
		content: llm.systemPrompt.getPrompt(),
	};
	const openaiResponseMessage = await openai.chat.completions.create({
		messages: [
			systemPromptMessage,
			...llm.chatMessageManager.getMessages(),
		],
		model: llm.model,
		max_tokens: llm.maxTokens,
		tools: llm.tools?.map((tool) =>
			tool.getSchema({ provider: llm.provider }),
		) as OpenAI.ChatCompletionTool[],
	});

	const responseMessage = convertOpenAIMessageToLLMResponseMessage({
		message: openaiResponseMessage,
	});

	return responseMessage;
};
