import { Role } from '@Agent/common/enums';

interface IToolCallResponseContent {
	type: 'tool_result';
	tool_use_id: string; // This should match the tool_use id from Claude's request
	content: string; // or whatever your tool returns
}

export interface IChatMessage {
	role: Role;
	content: string | IToolCallResponseContent[];
}
