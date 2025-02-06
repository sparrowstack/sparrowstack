import type { IRuntimeParams } from '@sparrowstack/tool/common/interfaces';

export type Validate = (runtimeParams: IRuntimeParams) => Promise<boolean>;
