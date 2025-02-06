import { Anthropic } from '@anthropic-ai/sdk';
import type { IToolSchemaParams } from '@tool';
import { PropertyType } from '@sparrowstack/tool/common/enums';
import {
	processParameters,
	getRequiredParameters,
} from '@sparrowstack/tool/common/utils';

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
