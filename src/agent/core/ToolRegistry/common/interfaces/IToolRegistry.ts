import { Tool } from '@sparrowstack/tool';

export interface IToolRegistry {
	[toolName: string]: Tool;
}
