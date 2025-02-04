import { formatForMarkdown } from '@tools/getDirectoryStucture/function/common/utils/formatForMarkdown';
import { getDirectoryStructure } from '@tools/getDirectoryStucture/function/getDirectoryStructure';

const directoryStructure = getDirectoryStructure({
	directoryPath: process.cwd(),
});

console.log(formatForMarkdown(directoryStructure));
