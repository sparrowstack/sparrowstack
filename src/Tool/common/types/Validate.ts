import type { IValidateParams } from '@Tool/common/interfaces';

export type Validate = ({
	context,
	callCount,
}: IValidateParams) => Promise<boolean>;
