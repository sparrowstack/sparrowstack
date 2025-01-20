import { Role } from '@Agent/common/enums';
import { BaseLLM } from '@Agent/core/llms/BaseLLM';

interface IOptions {
	llm: BaseLLM;
	message: string;
}

export const addAssistantMessageToMessages = ({ llm, message }: IOptions) => {
	const assistantMessage = { role: Role.Assistant, content: message };

	llm.addToMessages({ message: assistantMessage });

	return [...llm.getMessages()];
};
