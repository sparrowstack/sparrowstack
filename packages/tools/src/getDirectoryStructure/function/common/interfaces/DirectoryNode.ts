import { DirectoryNodeType } from '@tools/getDirectoryStructure/function/common/enums';

export interface DirectoryNode {
	name: string;
	type: DirectoryNodeType;
	children?: DirectoryNode[];
}
