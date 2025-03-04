export interface IToToolCallResponseMessagesParams {
	toolCallResults: {
		id: string;
		name: string;
		result: unknown;
	}[];
}
