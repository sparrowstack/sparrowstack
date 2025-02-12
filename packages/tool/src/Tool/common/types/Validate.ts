import type { IRuntimeParams } from '@tool/common/interfaces';

export type Validate = (runtimeParams: IRuntimeParams) => Promise<boolean>;
