import type {
	GoogleGenerativeAIToolCallUserResponseMessage,
	GoogleGenerativeAIToolCallFunctionResponseMessage,
} from '@core/providers/GoogleGenerativeAIProvider/common/interfaces';

export type GoogleGenerativeAIToolCallResponseMessages = Array<
	| GoogleGenerativeAIToolCallUserResponseMessage
	| GoogleGenerativeAIToolCallFunctionResponseMessage
>;
