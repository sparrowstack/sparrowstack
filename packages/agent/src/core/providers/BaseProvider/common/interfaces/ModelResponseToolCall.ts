export interface ModelResponseToolCall {
	id: string;
	name: string;
	callId?: string;
	status?: any;
	parameters: unknown;
	rawToolCall: unknown;
}
