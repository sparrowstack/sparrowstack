import type {
	Validate,
	ToolFunction,
	Parameters,
	CallableFunctionResponseMessage,
} from '@Tool/common/types';

export interface IToolParams {
	name: string;
	description: string;
	validate?: Validate;
	maxCallCount?: number;
	function: ToolFunction;
	parameters?: Parameters;
	validationFailedMessage?: string | CallableFunctionResponseMessage;
	maxCallCountExceededResponse?: string | CallableFunctionResponseMessage;
}
