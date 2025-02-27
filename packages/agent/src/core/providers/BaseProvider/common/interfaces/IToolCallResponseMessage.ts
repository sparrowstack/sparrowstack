import type { ToolCallResponseMessages } from '@core/providers/BaseProvider/common/types';

export interface IToolCallResponseMessage {
	userMessages?: ToolCallResponseMessages[];
	customMessages?: ToolCallResponseMessages[];
	assistantMessages?: ToolCallResponseMessages[];
}
