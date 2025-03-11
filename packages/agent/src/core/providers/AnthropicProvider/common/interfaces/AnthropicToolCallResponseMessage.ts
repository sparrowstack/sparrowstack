import type { Anthropic } from '@anthropic-ai/sdk';
import { Role } from '@core/providers/AnthropicProvider/common/enums/Role';

export type AnthropicToolCallResponseMessage = {
	role: Role;
	content: Anthropic.Messages.ToolResultBlockParam[];
};
