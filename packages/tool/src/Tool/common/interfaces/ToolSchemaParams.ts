import type { ToolParams } from '@tool/common/interfaces/ToolParams';

export type ToolSchemaParams = Omit<ToolParams, 'function'>;
