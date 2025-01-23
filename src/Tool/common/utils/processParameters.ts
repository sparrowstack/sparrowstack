import { PropertyType } from '@Tool/common/enums';
import type { IParameterDefinition } from '@Tool/common/interfaces';

interface IOptions {
	parameters: Record<string, IParameterDefinition>;
}

export const processParameters = ({
	parameters,
}: IOptions): Record<string, unknown> => {
	return Object.entries(parameters).reduce(
		(accumulator, [name, parameterDefinition]) => ({
			...accumulator,
			[name]: {
				type: parameterDefinition.type,
				description: parameterDefinition.description,
				...(parameterDefinition.enum
					? { enum: parameterDefinition.enum }
					: {}),
				...(parameterDefinition.type === PropertyType.Object &&
				parameterDefinition.properties
					? {
							properties: processParameters({
								parameters: parameterDefinition.properties,
							}),
						}
					: {}),
			},
		}),
		{},
	);
};
