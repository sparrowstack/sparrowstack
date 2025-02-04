import { Role } from '@agent/core/ChatMessage/common/enums/Role';
import type { ToolCallRequestMessageContent } from '@agent/core/providers/BaseProvider/common/types/ToolCallRequestMessageContent';
import type { ToolCallRequestMessageToolCalls } from '@agent/core/providers/BaseProvider/common/types/ToolCallRequestMessageToolCalls';

export type ToolCallRequestMessage = {
	role: Role;
	content?: ToolCallRequestMessageContent;
	tool_calls?: ToolCallRequestMessageToolCalls;
};
