import { Role } from '@sparrowstack/core';
import type { ToolCallRequestMessageContent } from '@core/providers/AnthropicProvider/common/types/ToolCallRequestMessageContent';

export type IToolCallRequestMessage = {
	role: Role;
	content: ToolCallRequestMessageContent;
};
