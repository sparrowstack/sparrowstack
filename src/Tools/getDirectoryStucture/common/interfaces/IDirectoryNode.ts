import { DirectoryNodeType } from '@root/src/Tools/getDirectoryStucture/common/enums';

export interface IDirectoryNode {
	name: string;
	type: DirectoryNodeType;
	children?: IDirectoryNode[];
}
