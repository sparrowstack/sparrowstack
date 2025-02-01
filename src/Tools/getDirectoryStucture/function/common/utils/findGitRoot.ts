import * as fs from 'fs';
import * as path from 'path';

// Helper function to find the git root directory
export const findGitRoot = ({ startPath }: { startPath: string }): string => {
	let currentPath = startPath;
	while (currentPath !== path.parse(currentPath).root) {
		if (fs.existsSync(path.join(currentPath, '.git'))) {
			return currentPath;
		}
		currentPath = path.dirname(currentPath);
	}
	return startPath; // If no .git directory is found, return the original path
};
