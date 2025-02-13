import { formatForMarkdown } from '@tools/getDirectoryStructure/function/common/utils/formatForMarkdown';
import { getDirectoryStructure } from '@tools/getDirectoryStructure/function/getDirectoryStructure';

const directoryStructure = getDirectoryStructure({
	directoryPath: process.cwd(),
});

console.log(formatForMarkdown(directoryStructure));
