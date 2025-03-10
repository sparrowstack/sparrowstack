import type { AnthropicToolCallResponseMessage } from '@core/providers/AnthropicProvider/common/interfaces/AnthropicToolCallResponseMessage';

export interface ToolCallResponseMessage {
	userMessages?: AnthropicToolCallResponseMessage[];
	customMessages?: AnthropicToolCallResponseMessage[];
	assistantMessages?: AnthropicToolCallResponseMessage[];
}
