import { Role } from '@sparrow/core/ChatMessage/common/enums/Role';
import type { ToolCallRequestMessageContent } from '@sparrow/core/providers/BaseProvider/common/types/ToolCallRequestMessageContent';
import type { ToolCallRequestMessageToolCalls } from '@sparrow/core/providers/BaseProvider/common/types/ToolCallRequestMessageToolCalls';

export type ToolCallRequestMessage = {
	role: Role;
	content?: ToolCallRequestMessageContent;
	tool_calls?: ToolCallRequestMessageToolCalls;
};
