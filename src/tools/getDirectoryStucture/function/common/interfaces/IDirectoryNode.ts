import { DirectoryNodeType } from '@tools/getDirectoryStucture/function/common/enums';

export interface IDirectoryNode {
	name: string;
	type: DirectoryNodeType;
	children?: IDirectoryNode[];
}
