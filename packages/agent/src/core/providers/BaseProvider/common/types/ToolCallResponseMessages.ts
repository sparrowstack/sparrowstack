export type ToolCallResponseMessage =
	// OpenAI
	| {
			role: string;
			tool_call_id: string;
			content: string;
	  }
	// Anthropic
	| {
			role: string;
			content: {
				type: string;
				tool_use_id: string;
				content: string;
			}[];
	  }
	// Google Generative AI
	| {
			role: 'function';
			parts: {
				functionResponse: {
					name: string;
					response: unknown;
				};
			}[];
	  }
	| {
			role: 'user';
			parts: {
				text: string;
			}[];
	  };
