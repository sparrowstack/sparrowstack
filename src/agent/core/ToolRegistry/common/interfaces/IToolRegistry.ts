import { Tool } from '@tool';

export interface IToolRegistry {
	[toolName: string]: Tool;
}
