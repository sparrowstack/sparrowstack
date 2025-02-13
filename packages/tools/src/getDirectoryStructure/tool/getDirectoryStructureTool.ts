import { Tool } from '@sparrowstack/tool';
import { getDirectoryStructureToolParams } from '@tools/getDirectoryStructure/tool/getDirectoryStructureToolParams';

export const getDirectoryStructureTool = new Tool(
	getDirectoryStructureToolParams,
);
