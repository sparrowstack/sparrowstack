import { formatForMarkdown } from '@sparrowstack/tools/src/getDirectoryStucture/function/common/utils/formatForMarkdown';
import { getDirectoryStructure } from '@sparrowstack/tools/src/getDirectoryStucture/function/getDirectoryStructure';

const directoryStructure = getDirectoryStructure({
	directoryPath: process.cwd(),
});

console.log(formatForMarkdown(directoryStructure));
