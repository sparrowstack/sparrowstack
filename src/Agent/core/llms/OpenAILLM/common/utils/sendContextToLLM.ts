import OpenAI from 'openai';
import { Role } from '@Agent/common/enums';
import { BaseLLM } from '@root/src/Agent/core/llms/BaseLLM/BaseLLM';
import { convertOpenAIMessageToLLMResponseMessage } from '@Agent/core/llms/OpenAILLM/common/utils/convertOpenAIMessageToLLMResponseMessage';

interface IParams {
	llm: BaseLLM;
	openai: OpenAI;
}

export const sendContextToLLM = async ({ llm, openai }: IParams) => {
	const systemPromptMessage = {
		role: Role.System,
		content: llm.systemPrompt,
	};
	const openaiResponseMessage = await openai.chat.completions.create({
		messages: [systemPromptMessage, ...llm.getMessages()],
		model: llm.model,
		max_tokens: llm.maxTokens,
	});

	const responseMessage = convertOpenAIMessageToLLMResponseMessage({
		message: openaiResponseMessage,
	});

	return responseMessage;
};
