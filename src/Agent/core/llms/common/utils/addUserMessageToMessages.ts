import { Role } from '@Agent/common/enums';
import { BaseLLM } from '@root/src/Agent/core/llms/BaseLLM/BaseLLM';

interface IParams {
	llm: BaseLLM;
	message: string;
}

export const addUserMessageToMessages = ({ llm, message }: IParams) => {
	const userMessage = { role: Role.User, content: message };

	llm.addToMessages({ message: userMessage });

	return [...llm.getMessages()];
};
