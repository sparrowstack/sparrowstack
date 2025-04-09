import { Anthropic } from '@anthropic-ai/sdk';
import { ContentType } from '@core/providers/AnthropicProvider/common/enums';
interface Params {
	response: Anthropic.Messages.Message;
}

export const getToolCalls = ({ response }: Params) => {
	const toolCalls = response.content.filter(
		(content) => content.type === ContentType.ToolUse,
	) as Anthropic.Messages.ToolUseBlock[];

	const adaptedToolCalls = toolCalls.map((toolCall) => {
		return {
			id: toolCall.id,
			name: toolCall.name,
			parameters: toolCall.input,
			rawToolCall: toolCall,
		};
	});

	return adaptedToolCalls;
};
