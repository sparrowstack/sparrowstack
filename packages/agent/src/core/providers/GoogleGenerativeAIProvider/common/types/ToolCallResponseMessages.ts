import { Role } from '@core/providers/GoogleGenerativeAIProvider/common/enums/Role';

export type ToolCallResponseMessage =
	| {
			role: Role.FunctionCall;
			parts: {
				functionResponse: {
					name: string;
					response: unknown;
				};
			}[];
	  }
	| {
			role: Role.User;
			parts: {
				text: string;
			}[];
	  };
