import type { ToolSchemaParams } from '@tool';
import { PropertyType } from '@tool/common/enums';
import { processParameters, getRequiredParameters } from '@tool/common/utils';

export const toAnthropicSchema = <SchemaType>({
	name,
	description,
	parameters,
}: ToolSchemaParams): SchemaType => {
	return {
		name: name,
		description: description,
		input_schema: {
			type: PropertyType.Object,
			properties: parameters ? processParameters({ parameters }) : {},
			required: parameters ? getRequiredParameters({ parameters }) : [],
		},
	} as SchemaType;
};
