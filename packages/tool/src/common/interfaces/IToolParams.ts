import type {
	Validate,
	ToolFunction,
	Parameters,
	CallableFunctionResponseMessage,
} from '@sparrowstack/tool/common/types';

export interface IToolParams {
	name: string;
	description: string;
	validate?: Validate;
	maxCallCount?: number;
	function: ToolFunction;
	parameters?: Parameters;
	validationFailedMessage?: string | CallableFunctionResponseMessage;
	maxCallCountExceededMessage?: string | CallableFunctionResponseMessage;
}
