import { Tool } from '@/packages/tool';

export interface IToolRegistry {
	[toolName: string]: Tool;
}
