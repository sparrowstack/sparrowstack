import type { Part } from '@google/generative-ai';
import { Role } from '@core/providers/GoogleGenerativeAIProvider/common/enums/Role';

export type GoogleGenerativeAIToolCallRequestMessage = {
	role: Role;
	parts: Part[];
};
