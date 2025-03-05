export type ToolCallResponseMessage = {
	role: string; // Update to Role
	content: {
		type: string;
		tool_use_id: string;
		content: string;
	}[];
};

