import type { Anthropic } from '@anthropic-ai/sdk';

export type ToolCallRequestMessageContent = Anthropic.Messages.ToolUseBlock[];
