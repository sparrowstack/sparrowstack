import { ContentType } from '@Agent/common/enums';

// TODO: Anthropic Specific:
// This is a temporary interface until we have a better understanding of the tool call response content
export interface IToolCallContentResult {
	type: ContentType.ToolResult;
	tool_use_id: string; // This should match the tool_use id from Claude's request
	content: string; // or whatever your tool returns
}
