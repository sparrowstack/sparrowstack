import { Tool } from '@Tool';

export interface IToolRegistry {
	[toolName: string]: Tool;
}
