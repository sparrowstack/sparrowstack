import { ParameterType } from '@Tool/common/enums';
import type { IToSchemaOptions } from '@Tool/common/interfaces';
import { processParameters, getRequiredParameters } from '@Tool/common/utils';

export const toOpenAISchema = ({
	name,
	description,
	parameters,
}: IToSchemaOptions) => {
	return {
		type: 'function',
		function: {
			name: name,
			description: description,
			parameters: {
				type: ParameterType.Object,
				properties: parameters ? processParameters({ parameters }) : {},
				required: parameters
					? getRequiredParameters({ parameters })
					: [],
				additionalProperties: false,
			},
		},
	};
};
