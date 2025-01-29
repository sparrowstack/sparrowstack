import type { IToolParams } from '@Tool';

export type ToolFunctions = Record<IToolParams['name'], IToolParams['function']>;
