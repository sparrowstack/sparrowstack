import { ProviderName } from '@Agent/core/providers/BaseProvider/common/enums/ProviderName';

import { getDirectoryStructureTool } from '@Tools/getDirectoryStucture/tool/getDirectoryStructureTool';

console.log(
	'getSchema',
	getDirectoryStructureTool.getSchema({
		providerName: ProviderName.Anthropic,
	}),
);
