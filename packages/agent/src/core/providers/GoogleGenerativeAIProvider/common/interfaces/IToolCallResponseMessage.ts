import type { ToolCallResponseMessage } from '@core/providers/GoogleGenerativeAIProvider/common/types';

export interface IToolCallResponseMessage {
	userMessages?: ToolCallResponseMessage[];
	customMessages?: ToolCallResponseMessage[];
	assistantMessages?: ToolCallResponseMessage[];
}
