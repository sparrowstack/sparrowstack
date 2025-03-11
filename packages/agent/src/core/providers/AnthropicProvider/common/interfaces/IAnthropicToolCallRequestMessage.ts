import { Role } from '@core/providers/AnthropicProvider/common/enums/Role';
import type { Anthropic } from '@anthropic-ai/sdk';

export interface IAnthropicToolCallRequestMessage {
	role: Role;
	content: Anthropic.Messages.ToolUseBlock[];
}
