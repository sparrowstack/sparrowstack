import { Role } from '@Agent/core/ChatMessage/common/enums/Role';
import type { ToolCallRequestMessageContent } from '@Agent/core/providers/BaseProvider/common/types/ToolCallRequestMessageContent';
import type { ToolCallRequestMessageToolCalls } from '@Agent/core/providers/BaseProvider/common/types/ToolCallRequestMessageToolCalls';

export type ToolCallRequestMessage = {
	role: Role;
	content?: ToolCallRequestMessageContent;
	tool_calls?: ToolCallRequestMessageToolCalls;
};
