import * as path from 'path';
import ignore from 'ignore';
import { findGitRoot } from '@root/src/Tools/getDirectoryStucture/common/utils';

export const filterFiles = ({
	ig,
	files,
	directoryPath,
}: {
	files: string[];
	directoryPath: string;
	ig: ReturnType<typeof ignore>;
}) => {
	return files.filter((file) => {
		// Skip dot folders/files
		if (file.startsWith('.')) {
			return false;
		}

		const fullPath = path.join(directoryPath, file);
		const relativePath = path.relative(
			findGitRoot({ startPath: directoryPath }),
			fullPath,
		);
		return !ig.ignores(relativePath);
	});
};
