import OpenAI from 'openai';
import { Model } from '@sparrowstack/core';
import type { Settings } from '@agent/common/interfaces';
import { SystemPrompt } from '@sparrowstack/system-prompt';
import { Role } from '@core/providers/OpenAIProvider/common/enums/Role';

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

	return chatCompletionCreateParams;
};
