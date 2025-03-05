export type ToolCallResponseMessage =
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
