import { Role } from '@Agent/common/enums';
import { BaseLLM } from '@Agent/core/llms/BaseLLM';

interface IToolCallResponseContent {
	type: 'tool_result';
	tool_use_id: string; // This should match the tool_use id from Claude's request
	content: string; // or whatever your tool returns
}

interface IToolResult {
	id: string; // This should match the tool_use id from Claude's request
	result: string;
}

interface IOptions {
	llm: BaseLLM;
	toolResults: IToolResult[];
}

export const addToolResultsToMessages = ({ llm, toolResults }: IOptions) => {
	const toolCallResultsContent = toolResults.map((toolResult) => {
		const { id, result } = toolResult;

		const toolCallResponseContent: IToolCallResponseContent = {
			type: 'tool_result',
			tool_use_id: id,
			content: result, // or whatever your tool returns
		};

		return toolCallResponseContent;
	});

	const userMessage = { role: Role.User, content: toolCallResultsContent };

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
