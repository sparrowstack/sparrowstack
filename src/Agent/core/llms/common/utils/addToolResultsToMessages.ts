import { Role } from '@Agent/common/enums';
import { ContentType } from '@Agent/common/enums';
import { BaseLLM } from '@Agent/core/llms/BaseLLM';
import type { IToolCallResult } from '@Agent/core/Tools/common/interfaces';

interface IToolCallContentResult {
	type: ContentType.ToolResult;
	tool_use_id: string; // This should match the tool_use id from Claude's request
	content: string; // or whatever your tool returns
}

interface IOptions {
	llm: BaseLLM;
	toolCallResults: IToolCallResult[];
}

export const addToolResultsToMessages = ({
	llm,
	toolCallResults,
}: IOptions) => {
	const toolCallContentResults = toolCallResults.map((toolCallResult) => {
		const { id, result } = toolCallResult;

		const toolCallContentResult: IToolCallContentResult = {
			// TODO: Might need to be refactored to Anthopic Type
			type: ContentType.ToolResult,
			tool_use_id: id,
			content: result,
		};

		return toolCallContentResult;
	});

	const userMessage = { role: Role.User, content: toolCallContentResults };

	llm.addToMessages({ message: userMessage });

	return [...llm.getMessages()];
};

// {
//             "role": "user",
//             "content": [
//                 {
//                     "type": "tool_result",
//                     "tool_use_id": "toolu_01A09q90qw90lq917835lq9",
//                     "content": "15 degrees"
//                 }
//             ]
//         }
