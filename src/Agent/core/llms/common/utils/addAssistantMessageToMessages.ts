import { Role } from '@Agent/common/enums';
import { BaseLLM } from '@Agent/core/llms/BaseLLM';

interface IOptions {
	llm: BaseLLM;
	message: string;
	toolCalls?: any[];
}

export const addAssistantMessageToMessages = ({
	llm,
	message,
	toolCalls,
}: IOptions) => {
	if (Array.isArray(toolCalls) && toolCalls.length > 0) {
		const content = [{ type: 'text', text: message }, ...toolCalls];
		const assistantMessage = { role: Role.Assistant, content };
		llm.addToMessages({ message: assistantMessage });
	} else {
		const assistantMessage = { role: Role.Assistant, content: message };
		llm.addToMessages({ message: assistantMessage });
	}

	return [...llm.getMessages()];
};
