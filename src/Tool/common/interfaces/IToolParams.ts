import type { IParameterDefinition } from '@Tool/common/interfaces';

export interface IToolParams {
	name: string;
	description: string;
	function: (...args: unknown[]) => Promise<unknown>;
	parameters?: Record<string, IParameterDefinition>;
}
