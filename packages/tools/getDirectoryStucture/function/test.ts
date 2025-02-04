import { formatForMarkdown } from '@/packages/tools/getDirectoryStucture/function/common/utils/formatForMarkdown';
import { getDirectoryStructure } from '@/packages/tools/getDirectoryStucture/function/getDirectoryStructure';

const directoryStructure = getDirectoryStructure({
	directoryPath: process.cwd(),
});

console.log(formatForMarkdown(directoryStructure));
