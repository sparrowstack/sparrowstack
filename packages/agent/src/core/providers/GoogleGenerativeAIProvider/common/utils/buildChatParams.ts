import type { Settings } from '@agent/common/interfaces';
import { FunctionCallingMode as FunctionCallingModeEnum } from '@google/generative-ai';
import type {
	Part,
	Content,
	StartChatParams,
	FunctionCallingMode,
} from '@google/generative-ai';

// Test Format
// ------------------------------------
import { z } from 'zod';

const zodToGeminiSchema = (zodSchema: z.ZodObject<any>): any => {
	const schema: {
		type: string;
		properties: { [key: string]: any }; // Index signature added
		required: string[];
	} = {
		type: 'object',
		properties: {},
		required: [],
	};

	for (const [key, value] of Object.entries(zodSchema.shape)) {
		const zodValue = value as z.ZodTypeAny; // Type assertion

		const property: any = {};

		if (zodValue instanceof z.ZodString) {
			property.type = 'string';
		} else if (zodValue instanceof z.ZodNumber) {
			property.type = 'number';
		} else if (zodValue instanceof z.ZodBoolean) {
			property.type = 'boolean';
		} else if (zodValue instanceof z.ZodEnum) {
			property.type = 'string';
			property.enum = zodValue.options;
		} else if (zodValue instanceof z.ZodArray) {
			property.type = 'array';
			if (zodValue.element instanceof z.ZodObject) {
				property.items = zodToGeminiSchema(zodValue.element);
			} else if (zodValue.element instanceof z.ZodString) {
				property.items = { type: 'string' };
			} else if (zodValue.element instanceof z.ZodNumber) {
				property.items = { type: 'number' };
			} else if (zodValue.element instanceof z.ZodBoolean) {
				property.items = { type: 'boolean' };
			}
		} else if (zodValue instanceof z.ZodObject) {
			property.type = 'object';
			Object.assign(property, zodToGeminiSchema(zodValue));
		}

		if (zodValue.description) {
			property.description = zodValue.description;
		}

		schema.properties[key] = property;

		if (!zodValue.isOptional()) {
			schema.required.push(key);
		}
	}

	return schema;
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
			type: z
				.enum([
					'Chat Response',
					'Tool Response',
					'Error',
					'Clarification',
				])
				.describe('The type of response you are providing the user.'),
			confidence: z
				.number()
				.describe('Confidence in the response, 1-100'),
			requiresFollowUp: z
				.boolean()
				.describe(
					'Whether the response requires a follow-up from the user',
				),
			ChainOfThought,
			originalResponse: z
				.string()
				.describe(
					'The original response from the LLM. This feild should contain the unstuctured/unformatted response from the LLM',
				),
		})
		.describe('Metadata for debugging purposes only'),
});

const responseSchema = zodToGeminiSchema(DefaultResponseFormat);

// ------------------------------------

interface IParams {
	settings?: Settings;
	isToolCall?: boolean;
	history: Content[] | undefined;
	systemInstruction: string | Content | Part | undefined;
}

export const buildChatParams = ({
	history,
	settings,
	systemInstruction,
	isToolCall = false,
}: IParams) => {
	const chatParams: StartChatParams = {
		history,
		systemInstruction,
		generationConfig: {
			maxOutputTokens: settings?.maxTokens ?? 4096,
			temperature: settings?.temperature ?? 0.5,
		},
		toolConfig: {
			functionCallingConfig: {
				mode: FunctionCallingModeEnum.AUTO, // Default
			},
		},
	};

	// Conditionally set functionCallingConfig.mode
	if (chatParams?.toolConfig?.functionCallingConfig) {
		if (isToolCall) {
			// If it's a tool call, use the settings.toolChoice or AUTO.
			chatParams.toolConfig.functionCallingConfig.mode =
				(settings?.toolChoice?.toUpperCase() as FunctionCallingMode) ??
				FunctionCallingModeEnum.AUTO;
		} else {
			// If it's not a tool call, force function calling off.
			chatParams.toolConfig.functionCallingConfig.mode =
				FunctionCallingModeEnum.NONE;
		}
	}

	// Conditionally apply responseMimeType and responseSchema
	if (!isToolCall) {
		chatParams.generationConfig = {
			...chatParams.generationConfig,
			responseMimeType: 'application/json',
			responseSchema,
		};
	}

	return chatParams;
};
