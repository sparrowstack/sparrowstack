import type { RuntimeParams } from '@tool/common/interfaces';

export type Validate = (runtimeParams: RuntimeParams) => Promise<boolean>;
