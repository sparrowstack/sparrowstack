import { ZodObject } from 'zod';
import type { NeedsPermission } from '@tool/common/interfaces/NeedsPermission';
import type {
	Validate,
	Parameters,
	ToolFunction,
	CallableFunctionResponseMessage,
} from '@tool/common/types';

export interface ToolParams {
	name: string;
	description: string;
	validate?: Validate;
	maxCallCount?: number;
	function: ToolFunction;
	parameters?: Parameters;
	needsPermission?: NeedsPermission;
	validationFailedMessage?: string | CallableFunctionResponseMessage;
	maxCallCountExceededMessage?: string | CallableFunctionResponseMessage;
	structuredOutput?: ZodObject<any, any, any, any, any>;
}
