import { BaseLLM } from '../../../BaseLLM';
import { Role } from '../../../../../common/enums';

interface IOptions {
	llm: BaseLLM;
	message: string;
}

export const addAssistantMessageToMessages = ({ llm, message }: IOptions) => {
	const assistantMessage = { role: Role.Assistant, content: message };

	llm.addToMessages({ message: assistantMessage });

	return [...llm.getMessages()];
};
