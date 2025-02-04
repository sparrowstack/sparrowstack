export type ToolCallResponseMessages =
	// OpenAI
	| {
			role: string;
			tool_call_id: string;
			content: string;
	  }[]
	// Anthropic
	| {
			role: string;
			content: {
				type: string;
				tool_use_id: string;
				content: string;
			}[];
	  }[];
