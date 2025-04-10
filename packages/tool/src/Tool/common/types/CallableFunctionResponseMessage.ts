import type { RuntimeParams } from '@tool/common/interfaces';

export type CallableFunctionResponseMessage = (
	runtimeParams: RuntimeParams,
) => Promise<string>;
