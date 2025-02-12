import { ProviderName } from '@sparrowstack/core';

import { getDirectoryStructureTool } from '@tools/getDirectoryStucture/tool/getDirectoryStructureTool';

console.log(
	'getSchema',
	getDirectoryStructureTool.getSchema({
		providerName: ProviderName.Anthropic,
	}),
);
