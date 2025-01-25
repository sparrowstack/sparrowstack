import { Anthropic } from '@anthropic-ai/sdk';
import { BaseLLM } from '@Agent/core/llms/BaseLLM/BaseLLM';
// import { executeToolCalls } from '@Agent/core/llms/common/utils';
import { sendContextToLLM } from '@Agent/core/ModelResponseAdapter/common/adapters/adaptAnthropicResponse/common/utils';

interface IParams {
	llm: BaseLLM;
	message: string;
	anthropic: Anthropic;
}

export const sendMessage = async ({ llm, message, anthropic }: IParams) => {
	llm.chatMessageManager.addUserMessage({ content: message });
	llm.interactionLogger.logContextWindow({ llm });

	const responseMessage = await sendContextToLLM({
		llm,
		anthropic,
	});

	llm.interactionLogger.logModelResponse({ message: responseMessage });

	llm.chatMessageManager.addAssistantMessage({
		content: responseMessage.text,
	});

	return responseMessage;
};
