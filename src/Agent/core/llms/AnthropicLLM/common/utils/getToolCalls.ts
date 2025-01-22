import { Anthropic } from '@anthropic-ai/sdk';
import { ContentType } from '@Agent/core/llms/AnthropicLLM/common/enums';

interface IOptions {
	message: Anthropic.Messages.Message;
}

export const getToolCalls = ({ message }: IOptions) => {
	const toolCalls = message.content.filter(
		(content) => content.type === ContentType.ToolUse,
	);

	return toolCalls;
};
