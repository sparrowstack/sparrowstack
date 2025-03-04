import type { ToolCallResponseMessage } from '@core/providers/AnthropicProvider/common/types';

export interface IToolCallResponseMessage {
	userMessages?: ToolCallResponseMessage[];
	customMessages?: ToolCallResponseMessage[];
	assistantMessages?: ToolCallResponseMessage[];
}
