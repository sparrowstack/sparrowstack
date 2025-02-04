import { Role } from '@/packages/agent/core/ChatMessage/common/enums/Role';
import type { ToolCallRequestMessageContent } from '@/packages/agent/core/providers/BaseProvider/common/types/ToolCallRequestMessageContent';
import type { ToolCallRequestMessageToolCalls } from '@/packages/agent/core/providers/BaseProvider/common/types/ToolCallRequestMessageToolCalls';

export type ToolCallRequestMessage = {
	role: Role;
	content?: ToolCallRequestMessageContent;
	tool_calls?: ToolCallRequestMessageToolCalls;
};
