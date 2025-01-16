export interface IBaseLLM {
	sendMessage: ({ message }: { message: string }) => Promise<any>;
}
