import { Anthropic } from '@anthropic-ai/sdk';
import { ContentType } from '@Agent/common/enums';

interface IParams {
	message: Anthropic.Messages.Message;
}

export const getToolCalls = ({ message }: IParams) => {
	const toolCalls = message.content.filter(
		(content) => content.type === ContentType.ToolUse,
	) as Anthropic.Messages.ToolUseBlock[];

	return toolCalls;
};
