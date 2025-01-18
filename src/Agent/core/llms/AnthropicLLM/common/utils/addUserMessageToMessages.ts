import { BaseLLM } from '../../../BaseLLM';
import { Role } from '../../../../../common/enums';

interface IOptions {
	llm: BaseLLM;
	message: string;
}

export const addUserMessageToMessages = ({ llm, message }: IOptions) => {
	const userMessage = { role: Role.User, content: message };

	llm.addToMessages({ message: userMessage });

	return [...llm.getMessages()];
};
