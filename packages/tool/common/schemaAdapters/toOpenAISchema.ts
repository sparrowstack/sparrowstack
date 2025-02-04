import type { IToolSchemaParams } from '@/packages/tool';
import { PropertyType } from '@/packages/tool/common/enums';
import {
	processParameters,
	getRequiredParameters,
} from '@/packages/tool/common/utils';

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
