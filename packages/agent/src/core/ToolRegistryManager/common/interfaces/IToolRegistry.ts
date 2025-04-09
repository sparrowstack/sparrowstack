import { Tool } from '@sparrowstack/tool';

export interface ToolRegistry {
	[toolName: string]: Tool;
}
