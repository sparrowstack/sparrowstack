import { z } from 'zod';

export interface Settings {
	stream?: boolean;
	maxTokens?: number;
	thinking?: boolean;
	temperature?: number;
	thinkingBudget?: number;
	toolChoice?: 'any' | 'auto' | 'none';
	responseFormat?: z.ZodObject<any>;
}
