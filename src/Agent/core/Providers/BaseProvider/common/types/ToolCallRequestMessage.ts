import { Role } from '@Agent';
import type { ToolCallRequestMessageContent } from '@Agent/core/providers/BaseProvider/common/types/ToolCallRequestMessageContent';
import type { ToolCallRequestMessageToolCalls } from '@Agent/core/providers/BaseProvider/common/types/ToolCallRequestMessageToolCalls';

export type ToolCallRequestMessage = {
	role: Role;
	content?: ToolCallRequestMessageContent;
	tool_calls?: ToolCallRequestMessageToolCalls;
};
