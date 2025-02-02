import type { IRuntimeParams } from '@Tool/common/interfaces';

export type Validate = (runtimeParams: IRuntimeParams) => Promise<boolean>;
