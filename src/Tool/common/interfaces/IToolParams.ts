import type { Validate } from '@Tool/common/types';
import type { IParameterDefinition } from '@Tool/common/interfaces';

export interface IToolParams {
	name: string;
	callCount?: number;
	description: string;
	validate?: Validate;
	function: (...args: unknown[]) => Promise<unknown>;
	parameters?: Record<string, IParameterDefinition>;
}
