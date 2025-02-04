import type { IToolParams } from './IToolParams';

export interface IToolSchemaParams extends Omit<IToolParams, 'function'> {}
