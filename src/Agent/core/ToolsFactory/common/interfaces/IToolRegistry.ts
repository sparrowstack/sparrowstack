import { Tool } from '@Tool';

export interface IToolRegistry {
	tools: Tool[];
	functions: Record<Tool['name'], Tool['function']>;
}
