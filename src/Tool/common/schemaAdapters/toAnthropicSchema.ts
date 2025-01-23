import { ParameterType } from '@Tool/common/enums';
import type { IToSchemaOptions } from '@Tool/common/interfaces';
import { processParameters, getRequiredParameters } from '@Tool/common/utils';

export const toAnthropicSchema = ({
	name,
	description,
	parameters,
}: IToSchemaOptions) => {
	return {
		name: name,
		description: description,
		input_schema: {
			type: ParameterType.Object,
			properties: parameters ? processParameters({ parameters }) : {},
			required: parameters ? getRequiredParameters({ parameters }) : [],
		},
	};
};
