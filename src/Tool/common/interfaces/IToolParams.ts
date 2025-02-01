import type { Validate, ToolFunction, Parameters } from '@Tool/common/types';

export interface IToolParams {
	name: string;
	description: string;
	validate?: Validate;
	maxCallCount?: number;
	function: ToolFunction;
	parameters?: Parameters;
}
