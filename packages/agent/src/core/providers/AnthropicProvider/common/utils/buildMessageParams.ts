import { Anthropic } from '@anthropic-ai/sdk';
import type { Settings } from '@agent/common/interfaces';
import { ThinkingType } from '@core/providers/AnthropicProvider/common/enums';

// Test Format
// ------------------------------------
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

const zodToAnthropicFormat = <T extends z.ZodObject<any>>(
	schema: T,
): string => {
	const jsonSchema = zodToJsonSchema(schema);

	return `\n\nYou must respond in valid JSON matching this schema:
${JSON.stringify(jsonSchema, null, 2)}`;
};

const Step = z.object({
	explanation: z.string(),
	output: z.string(),
});

const ChainOfThought = z
	.object({
		steps: z.array(Step),
	})
	.describe('The LLM chain of thought to arrive to this answer.');

const DefaultResponseFormat = z.object({
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

const responseFormat = zodToAnthropicFormat(DefaultResponseFormat);

// ------------------------------------

interface IParams {
	model: string;
	system: string;
	settings?: Settings;
	tools: Anthropic.Tool[];
	messages: Anthropic.Messages.MessageParam[];
}

export const buildMessageParams = ({
	model,
	tools,
	system,
	messages,
	settings,
}: IParams) => {
	// TODO: Add Metadata
	const messagesParams: Anthropic.Messages.MessageCreateParams = {
		model,
		tools,
		system,
		messages,
		stream: settings?.stream ?? false,
		max_tokens: settings?.maxTokens ?? 4096,
		temperature: settings?.temperature ?? 0.5,
	};

	if (settings?.toolChoice) {
		messagesParams.tool_choice = {
			type: settings.toolChoice,
		};
	}

	if (settings?.thinking) {
		messagesParams.thinking = {
			type: ThinkingType.Enabled,
			budget_tokens: settings.thinkingBudget ?? 16000,
		};
	}

	messagesParams.system += responseFormat;

	console.log('--------------------------------');
	console.log('responseFormat', responseFormat);
	console.log('messagesParams.system', messagesParams.system);
	console.log('--------------------------------');

	return messagesParams;
};
