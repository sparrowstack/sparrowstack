import { Tool } from '@/packages/tool';
import { getDirectoryStructureToolParams } from '@/packages/tools/getDirectoryStucture/tool/getDirectoryStructureToolParams';

export const getDirectoryStructureTool = new Tool(
	getDirectoryStructureToolParams,
);
