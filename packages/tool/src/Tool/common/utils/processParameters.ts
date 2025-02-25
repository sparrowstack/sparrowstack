import { PropertyType } from '@tool/common/enums';
import type { IParameterDefinition } from '@tool/common/interfaces';

interface IParams {
	parameters: Record<string, IParameterDefinition>;
	upperCasePropertyTypes?: boolean;
	removeEnums?: boolean;
}

export const processParameters = ({
	parameters,
	removeEnums = false,
	upperCasePropertyTypes = false,
}: IParams): Record<string, unknown> => {
	return Object.entries(parameters).reduce(
		(accumulator, [name, parameterDefinition]) => ({
			...accumulator,
			[name]: {
				type: upperCasePropertyTypes
					? parameterDefinition.type.toUpperCase()
					: parameterDefinition.type,
				description: parameterDefinition.description,
				...(parameterDefinition.enum && !removeEnums
					? { enum: parameterDefinition.enum }
					: {}),
				...(parameterDefinition.type === PropertyType.Object &&
				parameterDefinition.properties
					? {
							properties: processParameters({
								parameters: parameterDefinition.properties,
								removeEnums,
								upperCasePropertyTypes,
							}),
						}
					: {}),
			},
		}),
		{},
	);
};
