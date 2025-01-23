import type { Anthropic } from '@anthropic-ai/sdk';
import type {
	IToolCalls,
	IToolCallResult,
} from '@Agent/core/Tools/common/interfaces';

interface IParams {
	llmToolCalls?: IToolCalls;
	toolCalls: Anthropic.Messages.ToolUseBlock[];
}

export const executeToolCalls = async ({
	toolCalls,
	llmToolCalls,
}: IParams) => {
	const toolCallResults: IToolCallResult[] = [];

	for (const toolCall of toolCalls) {
		const tool = llmToolCalls?.[toolCall.name];

		if (!tool) {
			throw new Error(`Tool ${toolCall.name} not found`);
		}

		// TODO: Add support for arguments
		// (toolCall.input) // arguments
		const result = await tool();

		toolCallResults.push({
			result,
			id: toolCall.id,
		});
	}

	return toolCallResults;
};
