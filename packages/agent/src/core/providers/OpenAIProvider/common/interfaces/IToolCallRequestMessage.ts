import { Role } from '@sparrowstack/core';
import type { ToolCallRequestMessageContent } from '@core/providers/OpenAIProvider/common/types/ToolCallRequestMessageContent';
import type { ToolCallRequestMessageToolCalls } from '@core/providers/OpenAIProvider/common/types/ToolCallRequestMessageToolCalls';

export type IToolCallRequestMessage = {
	role: Role;
	content?: ToolCallRequestMessageContent;
	tool_calls?: ToolCallRequestMessageToolCalls;
};
