import type { ITool } from '@Agent/core/Tools/common/interfaces/ITool';
import type { IToolCall } from '@Agent/core/Tools/common/interfaces/IToolCall';

export interface IToolSchema {
	provider: string;
	tool: ITool;
	toolCall: IToolCall;
}
