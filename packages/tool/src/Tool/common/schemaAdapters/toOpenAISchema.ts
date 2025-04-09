import type { IToolSchemaParams } from '@tool';
import { PropertyType } from '@tool/common/enums';
import { processParameters, getRequiredParameters } from '@tool/common/utils';

export const toOpenAISchema = <SchemaType>({
	name,
	parameters,
	description,
}: IToolSchemaParams): SchemaType => {
	return {
		type: 'function',
		name,
		description,
		parameters: {
			type: PropertyType.Object,
			properties: parameters ? processParameters({ parameters }) : {},
			required: parameters ? getRequiredParameters({ parameters }) : [],
			additionalProperties: false,
		},
		strict: true,
	} as SchemaType;
};
