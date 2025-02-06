import type { IRuntimeParams } from '@sparrowstack/tool/common/interfaces';

export type CallableFunctionResponseMessage = (
	runtimeParams: IRuntimeParams,
) => Promise<string>;
