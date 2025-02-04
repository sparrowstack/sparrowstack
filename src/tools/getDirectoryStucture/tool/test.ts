import { ProviderName } from '@agent/core/providers/BaseProvider/common/enums/ProviderName';

import { getDirectoryStructureTool } from '@tools/getDirectoryStucture/tool/getDirectoryStructureTool';

console.log(
	'getSchema',
	getDirectoryStructureTool.getSchema({
		providerName: ProviderName.Anthropic,
	}),
);
