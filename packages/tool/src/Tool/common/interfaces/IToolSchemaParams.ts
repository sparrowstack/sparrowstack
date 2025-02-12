import type { IToolParams } from '@tool/common/interfaces/IToolParams';

export type IToolSchemaParams = Omit<IToolParams, 'function'>;
