import { OpenAI } from 'openai';
import { Role } from '@Agent/common/enums';
import { Anthropic } from '@anthropic-ai/sdk';

export interface IChatMessage {
	role: Role;
	content:
		| string
		| (
				| { type: string; text: string }
				| Anthropic.Messages.ToolUseBlock
				| OpenAI.Chat.Completions.ChatCompletionMessageToolCall
		  )[];
}
