import { Anthropic } from '@anthropic-ai/sdk';
import { ContentType } from '@Agent/common/enums';

interface IOptions {
	message: Anthropic.Messages.Message;
}

export const getToolCalls = ({ message }: IOptions) => {
	const toolCalls = message.content.filter(
		(content) => content.type === ContentType.ToolUse,
	) as Anthropic.Messages.ToolUseBlock[];

	return toolCalls;
};
