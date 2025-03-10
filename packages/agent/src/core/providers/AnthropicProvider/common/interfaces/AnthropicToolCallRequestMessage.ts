import { Role } from '@sparrowstack/core';
import type { Anthropic } from '@anthropic-ai/sdk';

export type AnthropicToolCallRequestMessage = {
	role: Role;
	content: Anthropic.Messages.ToolUseBlock[];
};
