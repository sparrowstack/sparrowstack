import { Role } from '@Agent/common/enums';
import { BaseLLM } from '@Agent/core/llms/BaseLLM';

interface IOptions {
	llm: BaseLLM;
	message: string;
}

export const addUserMessageToMessages = ({ llm, message }: IOptions) => {
	const userMessage = { role: Role.User, content: message };

	llm.addToMessages({ message: userMessage });

	return [...llm.getMessages()];
};
