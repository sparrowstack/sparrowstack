import { ProviderName } from '@sparrowstack/core';

import { getDirectoryStructureTool } from '@tools/getDirectoryStructure/tool/getDirectoryStructureTool';

console.log(
	'getSchema',
	getDirectoryStructureTool.getSchema({
		providerName: ProviderName.Anthropic,
	}),
);
