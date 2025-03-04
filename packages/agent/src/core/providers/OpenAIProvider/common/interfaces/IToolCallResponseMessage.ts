import type { ToolCallResponseMessage } from '@core/providers/OpenAIProvider/common/types';

export interface IToolCallResponseMessage {
	userMessages?: ToolCallResponseMessage[];
	customMessages?: ToolCallResponseMessage[];
	assistantMessages?: ToolCallResponseMessage[];
}
