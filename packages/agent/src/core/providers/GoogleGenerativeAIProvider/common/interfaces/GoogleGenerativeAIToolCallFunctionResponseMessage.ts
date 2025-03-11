import type { FunctionResponsePart } from '@google/generative-ai';
import { Role } from '@core/providers/GoogleGenerativeAIProvider/common/enums/Role';

export interface GoogleGenerativeAIToolCallFunctionResponseMessage {
	role: Role.FunctionCall;
	parts: FunctionResponsePart[];
}
