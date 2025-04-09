import * as fs from 'fs';
import * as path from 'path';
import { DirectoryNodeType } from '@tools/getDirectoryStructure/function/common/enums';
import type { DirectoryNode } from '@tools/getDirectoryStructure/function/common/interfaces';
import type { GetDirectoryStructureParams } from '@tools/getDirectoryStructure/function/common/interfaces/GetDirectoryStructureParams';
import {
	filterFiles,
	loadGitignore,
} from '@tools/getDirectoryStructure/function/common/utils';

export const getDirectoryStructure = ({
	directoryPath,
	ig = loadGitignore({ startPath: directoryPath }),
}: Omit<GetDirectoryStructureParams, 'indent' | 'isLast'>): DirectoryNode => {
	const files = fs.readdirSync(directoryPath);

	// Filter out git ignored files and dot folders
	const filteredFiles = filterFiles({ ig, files, directoryPath });

	const node: DirectoryNode = {
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
