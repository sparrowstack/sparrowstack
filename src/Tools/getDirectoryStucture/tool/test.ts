import { Provider } from '@Agent';

import { getDirectoryStructureTool } from '@Tools/getDirectoryStucture/tool/getDirectoryStructureTool';

console.log(
	getDirectoryStructureTool.getSchema({ providerName: Provider.Anthropic }),
);
