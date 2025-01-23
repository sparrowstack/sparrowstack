import { DirectoryNodeType } from '@Tools/getDirectoryStucture/common/enums';

export interface IDirectoryNode {
	name: string;
	type: DirectoryNodeType;
	children?: IDirectoryNode[];
}
