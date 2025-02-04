import { ProviderName } from '@/packages/agent/core/providers/BaseProvider/common/enums/ProviderName';

import { getDirectoryStructureTool } from '@/packages/tools/getDirectoryStucture/tool/getDirectoryStructureTool';

console.log(
	'getSchema',
	getDirectoryStructureTool.getSchema({
		providerName: ProviderName.Anthropic,
	}),
);
