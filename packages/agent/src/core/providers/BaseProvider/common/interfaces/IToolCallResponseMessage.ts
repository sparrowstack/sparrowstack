// import type { ToolCallResponseMessages } from '@core/providers/BaseProvider/common/types';

export interface IToolCallResponseMessage {
	userMessages: unknown[];
	customMessages: unknown[];
	assistantMessages: unknown[];
}
