import { formatForMarkdown } from '@Tools/getDirectoryStucture/function/common/utils/formatForMarkdown';
import { getDirectoryStructure } from '@Tools/getDirectoryStucture/function/getDirectoryStructure';

const directoryStructure = getDirectoryStructure({
	directoryPath: process.cwd(),
});

console.log(formatForMarkdown(directoryStructure));
