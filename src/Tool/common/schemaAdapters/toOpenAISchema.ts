import type { IToolSchemaParams } from '@Tool';
import { PropertyType } from '@Tool/common/enums';
import { processParameters, getRequiredParameters } from '@Tool/common/utils';

export const toOpenAISchema = ({
	name,
	parameters,
	description,
}: IToolSchemaParams) => {
	return {
		type: PropertyType.Function,
		function: {
			name: name,
			description: description,
			parameters: {
				type: PropertyType.Object,
				properties: parameters ? processParameters({ parameters }) : {},
				required: parameters
					? getRequiredParameters({ parameters })
					: [],
				additionalProperties: false,
			},
		},
	};
};
