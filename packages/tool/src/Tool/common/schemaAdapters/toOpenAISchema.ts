import type { IToolSchemaParams } from '@tool';
import { PropertyType } from '@tool/common/enums';
import { processParameters, getRequiredParameters } from '@tool/common/utils';

export const toOpenAISchema = <SchemaType>({
	name,
	parameters,
	description,
}: IToolSchemaParams): SchemaType => {
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
	} as SchemaType;
};
