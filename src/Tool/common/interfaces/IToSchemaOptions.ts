import type { IParameterDefinition } from '@Tool/common/interfaces';

export interface IToSchemaOptions {
	name: string;
	description: string;
	parameters: Record<string, IParameterDefinition>;
}
