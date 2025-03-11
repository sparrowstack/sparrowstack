import type { OpenAIToolCallResponseMessage } from '@core/providers/OpenAIProvider/common/interfaces/OpenAIToolCallResponseMessage';

export interface ToolCallResponseMessage {
	userMessages?: OpenAIToolCallResponseMessage[];
	customMessages?: OpenAIToolCallResponseMessage[];
	assistantMessages?: OpenAIToolCallResponseMessage[];
}
