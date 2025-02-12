import { DirectoryNodeType } from '@sparrowstack/tools/src/getDirectoryStucture/function/common/enums';

export interface IDirectoryNode {
	name: string;
	type: DirectoryNodeType;
	children?: IDirectoryNode[];
}
