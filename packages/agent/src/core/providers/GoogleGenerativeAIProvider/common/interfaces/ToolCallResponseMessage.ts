import type {
	GoogleGenerativeAIToolCallUserResponseMessage,
	GoogleGenerativeAIToolCallFunctionResponseMessage,
} from '@core/providers/GoogleGenerativeAIProvider/common/interfaces';

export interface ToolCallResponseMessage {
	userMessages?: GoogleGenerativeAIToolCallUserResponseMessage[];
	customMessages?: GoogleGenerativeAIToolCallFunctionResponseMessage[];
	assistantMessages?: GoogleGenerativeAIToolCallFunctionResponseMessage[];
}
