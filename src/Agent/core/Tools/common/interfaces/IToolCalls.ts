import type { IToolCall } from '@Agent/core/Tools/common/interfaces/IToolCall';

export interface IToolCalls {
	[key: string]: IToolCall['method'];
}
