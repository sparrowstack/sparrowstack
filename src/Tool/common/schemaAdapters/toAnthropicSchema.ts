import { Anthropic } from '@anthropic-ai/sdk';
import type { IToolSchemaParams } from '@Tool';
import { PropertyType } from '@Tool/common/enums';
import { processParameters, getRequiredParameters } from '@Tool/common/utils';

export const toAnthropicSchema = ({
	name,
	description,
	parameters,
}: IToolSchemaParams) => {
	return {
		name: name,
		description: description,
		input_schema: {
			type: PropertyType.Object,
			properties: parameters ? processParameters({ parameters }) : {},
			required: parameters ? getRequiredParameters({ parameters }) : [],
		},
	} as Anthropic.Tool;
};
