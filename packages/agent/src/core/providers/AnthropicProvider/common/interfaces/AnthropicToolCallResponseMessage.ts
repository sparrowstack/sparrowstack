import { Role } from '@sparrowstack/core';
import type { Anthropic } from '@anthropic-ai/sdk';

export type AnthropicToolCallResponseMessage = {
	role: Role;
	content: Anthropic.Messages.ToolResultBlockParam[];
};
