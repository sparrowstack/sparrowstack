import { z } from 'zod';

const Step = z.object({
	explanation: z.string(),
	output: z.string(),
});

const ChainOfThought = z
	.object({
		steps: z.array(Step),
	})
	.describe('The LLM chain of thought to arrive to this answer.');

export const mockZodResponseFormat = z.object({
	text: z.string().describe('The response text to display to the user'),
	metadata: z
		.object({
			type: z.enum([
				'general',
				'tool_response',
				'error',
				'clarification',
			]),
			confidence: z
				.number()
				.describe('Confidence in the response, 1-100'),
			requiresFollowUp: z
				.boolean()
				.describe(
					'Whether the response requires a follow-up from the user',
				),
			ChainOfThought,
		})
		.describe('Metadata for debugging purposes only'),
});
