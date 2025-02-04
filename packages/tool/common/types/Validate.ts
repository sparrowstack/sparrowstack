import type { IRuntimeParams } from '@/packages/tool/common/interfaces';

export type Validate = (runtimeParams: IRuntimeParams) => Promise<boolean>;
