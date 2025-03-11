import type { TextPart } from '@google/generative-ai';
import { Role } from '@core/providers/GoogleGenerativeAIProvider/common/enums/Role';

export interface GoogleGenerativeAIToolCallUserResponseMessage {
	role: Role.User;
	parts: TextPart[];
}
