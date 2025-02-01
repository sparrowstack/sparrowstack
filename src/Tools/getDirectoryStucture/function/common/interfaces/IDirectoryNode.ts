import { DirectoryNodeType } from '@Tools/getDirectoryStucture/function/common/enums';

export interface IDirectoryNode {
	name: string;
	type: DirectoryNodeType;
	children?: IDirectoryNode[];
}
