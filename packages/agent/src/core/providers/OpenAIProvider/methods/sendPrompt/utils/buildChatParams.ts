import OpenAI from 'openai';
import { Model } from '@sparrowstack/core';
import type { Settings } from '@agent/common/interfaces';
import { SystemPrompt } from '@sparrowstack/system-prompt';
import { Role } from '@core/providers/OpenAIProvider/common/enums/Role';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';

interface IParams {
	model: string;
	settings?: Settings;
	systemPrompt: SystemPrompt;
	tools: OpenAI.ChatCompletionTool[];
	chatMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
}

export const buildChatParams = ({
	model,
	tools,
	settings,
	systemPrompt,
	chatMessages,
}: IParams) => {
	const systemPromptMessage = {
		role: Role.System,
		content: systemPrompt.getPrompt(),
	} as OpenAI.ChatCompletionMessageParam;
	const messages = [systemPromptMessage, ...chatMessages];

	const chatCompletionCreateParams: OpenAI.ChatCompletionCreateParams = {
		model,
		tools,
		messages,
	};

	if (model === Model.OpenAI.o3Mini) {
		chatCompletionCreateParams.max_completion_tokens =
			settings?.maxTokens ?? 4096;
	} else {
		chatCompletionCreateParams.max_tokens = settings?.maxTokens ?? 4096;
	}

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

	const responseFormat = zodResponseFormat(
		DefaultResponseFormat,
		'default_response_format',
	);

	chatCompletionCreateParams.response_format = responseFormat;

	return chatCompletionCreateParams;
};
