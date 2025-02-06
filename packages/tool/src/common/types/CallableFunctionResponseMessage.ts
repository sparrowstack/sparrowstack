import type { IRuntimeParams } from '@tool/common/interfaces';

export type CallableFunctionResponseMessage = (
	runtimeParams: IRuntimeParams,
) => Promise<string>;
