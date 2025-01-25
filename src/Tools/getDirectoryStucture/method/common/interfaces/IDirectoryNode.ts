import { DirectoryNodeType } from '@Tools/getDirectoryStucture/method/common/enums';

export interface IDirectoryNode {
	name: string;
	type: DirectoryNodeType;
	children?: IDirectoryNode[];
}
