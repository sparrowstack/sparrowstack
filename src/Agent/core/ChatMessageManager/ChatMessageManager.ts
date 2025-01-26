import { type IChatMessage, ChatMessage } from '@Agent/core/ChatMessage';
import { type IToolCall } from '@Agent/core/ModelResponseAdapter/common/interfaces';

export class ChatMessageManager {
	protected chatMessages: IChatMessage[] = [];

	public addUserMessage({ text }: { text: string }): void {
		const message = ChatMessage.createUserMessage({ content: text });

		this.chatMessages.push(message);
	}

	public addAssistantMessage({
		text,
		toolCalls,
	}: {
		text: string;
		toolCalls?: IToolCall[];
	}): void {
		// Default to text:string
		let content: IChatMessage['content'] = text;

		// If ToolCalls update the content
		// to include the toolCalls
		// ---------------------------------
		const rawToolCalls = toolCalls?.map((toolCall: IToolCall) => {
			return toolCall.rawToolCall;
		});

		if (Array.isArray(rawToolCalls) && rawToolCalls.length > 0) {
			content = [{ type: 'text', text }, ...rawToolCalls];
		}
		// ---------------------------------

		const message = ChatMessage.createAssistantMessage({ content });

		this.chatMessages.push(message);
	}

	public addToMessages({ message }: { message: IChatMessage }): void {
		this.chatMessages.push(message);
	}

	public getMessages(): IChatMessage[] {
		return [...this.chatMessages];
	}

	public clearMessages(): void {
		this.chatMessages = [];
	}
}
