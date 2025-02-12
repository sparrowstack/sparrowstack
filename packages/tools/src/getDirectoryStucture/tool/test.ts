import { ProviderName } from '@core/providers/BaseProvider/common/enums/ProviderName';

import { getDirectoryStructureTool } from '@sparrowstack/tools/src/getDirectoryStucture/tool/getDirectoryStructureTool';

console.log(
	'getSchema',
	getDirectoryStructureTool.getSchema({
		providerName: ProviderName.Anthropic,
	}),
);
