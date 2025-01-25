import { formatForMarkdown } from '@Tools/getDirectoryStucture/method/common/utils/formatForMarkdown';
import { getDirectoryStructure } from '@Tools/getDirectoryStucture/method/getDirectoryStructure';

const directoryStructure = getDirectoryStructure({
	directoryPath: process.cwd(),
});

console.log(formatForMarkdown(directoryStructure));
