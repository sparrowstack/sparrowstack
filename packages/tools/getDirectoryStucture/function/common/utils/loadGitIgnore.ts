import * as fs from 'fs';
import * as path from 'path';
import ignore from 'ignore';
import { findGitRoot } from '@/packages/tools/getDirectoryStucture/function/common/utils';

export const loadGitignore = ({
	startPath,
}: {
	startPath: string;
}): ReturnType<typeof ignore> => {
	const ig = ignore();
	const gitRoot = findGitRoot({ startPath });
	const gitignorePath = path.join(gitRoot, '.gitignore');

	if (fs.existsSync(gitignorePath)) {
		const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
		ig.add(gitignoreContent);
	}

	return ig;
};
