import type { IRuntimeParams } from '@Tool/common/interfaces';

export type CallableFunctionResponseMessage = (
	runtimeParams: IRuntimeParams,
) => Promise<string>;
