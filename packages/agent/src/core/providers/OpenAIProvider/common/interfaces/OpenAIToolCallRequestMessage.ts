import type { OpenAI } from 'openai';
import { Role } from '@core/providers/OpenAIProvider/common/enums/Role';

export type OpenAIToolCallRequestMessage = {
	role: Role;
	tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[];
};
