import { DirectoryNodeType } from '@Agent/core/Tools/getDirectoryStucture/common/enums';

export interface IDirectoryNode {
	name: string;
	type: DirectoryNodeType;
	children?: IDirectoryNode[];
}
