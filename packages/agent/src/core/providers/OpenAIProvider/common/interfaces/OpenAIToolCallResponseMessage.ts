import type { OpenAI } from 'openai';
import { Role } from '@core/providers/OpenAIProvider/common/enums/Role';

export interface OpenAIToolCallResponseMessage {
	role: Role;
	tool_call_id: string;
	content:
		| string
		| Array<OpenAI.Chat.Completions.ChatCompletionContentPartText>[];
}
