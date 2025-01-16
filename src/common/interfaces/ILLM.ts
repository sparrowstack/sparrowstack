export interface ILLM {
	sendMessage: ({ message }: { message: string }) => Promise<any>;
}
