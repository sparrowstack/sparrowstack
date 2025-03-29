import { ZodObject } from 'zod';
import type { INeedsPermission } from '@tool/common/interfaces/INeedsPermission';
import type {
	Validate,
	Parameters,
	ToolFunction,
	CallableFunctionResponseMessage,
} from '@tool/common/types';

export interface IToolParams {
	name: string;
	description: string;
	validate?: Validate;
	maxCallCount?: number;
	function: ToolFunction;
	parameters?: Parameters;
	needsPermission?: INeedsPermission;
	validationFailedMessage?: string | CallableFunctionResponseMessage;
	maxCallCountExceededMessage?: string | CallableFunctionResponseMessage;
	structuredOutput?: ZodObject<any, any, any, any, any>;
}
