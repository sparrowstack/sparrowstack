import { z } from 'zod';

export interface StructuredOutputConstructorParams {
	name?: string;
	strucuturedOutput: z.ZodObject<any>;
}
