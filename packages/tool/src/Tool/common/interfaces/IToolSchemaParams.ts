import type { IToolParams } from '@tool/common/interfaces/IToolParams';

export interface IToolSchemaParams extends Omit<IToolParams, 'function'> {}
