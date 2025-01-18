import OpenAI from 'openai';
import { Role } from '../../../../../common/enums';
import { BaseLLM } from '../../../BaseLLM';
import { convertOpenAIMessageToLLMResponseMessage } from './convertOpenAIMessageToLLMResponseMessage';

interface IOptions {
	llm: BaseLLM;
	openai: OpenAI;
}

export const sendContextToLLM = async ({ llm, openai }: IOptions) => {
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
