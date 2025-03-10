import { Role } from '@core/providers/GoogleGenerativeAIProvider/common/enums/Role';
import type { Part } from '@google/generative-ai';

export type IToolCallRequestMessage = {
	role: Role;
	parts: Part[];
};
