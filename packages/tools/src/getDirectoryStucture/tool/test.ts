import { ProviderName } from '@sparrowstack/agent';

import { getDirectoryStructureTool } from '@tools/getDirectoryStucture/tool/getDirectoryStructureTool';

console.log(
	'getSchema',
	getDirectoryStructureTool.getSchema({
		providerName: ProviderName.Anthropic,
	}),
);
