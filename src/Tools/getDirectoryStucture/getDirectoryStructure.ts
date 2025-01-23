import * as fs from 'fs';
import ignore from 'ignore';
import * as path from 'path';
import { DirectoryNodeType } from '@root/src/Tools/getDirectoryStucture/common/enums';
import type { IDirectoryNode } from '@root/src/Tools/getDirectoryStucture/common/interfaces';
import {
	filterFiles,
	loadGitignore,
} from '@root/src/Tools/getDirectoryStucture/common/utils';

interface IParams {
	directoryPath: string;
	indent?: string;
	isLast?: boolean;
	ig?: ReturnType<typeof ignore>;
}

export const getDirectoryStructure = ({
	directoryPath,
	ig = loadGitignore({ startPath: directoryPath }),
}: Omit<IParams, 'indent' | 'isLast'>): IDirectoryNode => {
	const files = fs.readdirSync(directoryPath);

	// Filter out git ignored files and dot folders
	const filteredFiles = filterFiles({ ig, files, directoryPath });

	const node: IDirectoryNode = {
		name: path.basename(directoryPath),
		type: DirectoryNodeType.Directory,
		children: [],
	};

	filteredFiles.forEach((file) => {
		const fullPath = path.join(directoryPath, file);
		const stats = fs.statSync(fullPath);

		if (stats.isDirectory()) {
			node.children?.push(
				getDirectoryStructure({
					directoryPath: fullPath,
					ig,
				}),
			);
		} else {
			node.children?.push({
				name: file,
				type: DirectoryNodeType.File,
			});
		}
	});

	return node;
};
