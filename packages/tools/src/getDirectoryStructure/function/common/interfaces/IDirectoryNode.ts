import { DirectoryNodeType } from '@tools/getDirectoryStructure/function/common/enums';

export interface IDirectoryNode {
	name: string;
	type: DirectoryNodeType;
	children?: IDirectoryNode[];
}
