import { Role } from '@Agent/common/enums';
import { BaseLLM } from '@Agent/core/llms/BaseLLM/BaseLLM';
// import type { IToolCallContentResult } from '@Agent/common/interfaces/IToolCallContentResult';

interface IParams {
	llm: BaseLLM;
	message: string;
	// toolCalls?: IToolCallContentResult[];
}

export const addAssistantMessageToMessages = ({
	llm,
	message,
	// toolCalls,
}: IParams) => {
	// if (Array.isArray(toolCalls) && toolCalls.length > 0) {
	// 	const content = [{ type: 'text', text: message }, ...toolCalls];
	// 	const newMessage = { role: Role.Assistant, content };

	// 	llm.addToMessages({ message: newMessage });
	// } else {
	const newMessage = { role: Role.Assistant, content: message };
	llm.addToMessages({ message: newMessage });
	// }

	return [...llm.getMessages()];
};
