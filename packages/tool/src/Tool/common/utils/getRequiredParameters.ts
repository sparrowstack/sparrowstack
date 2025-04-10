import type { ParameterDefinition } from '@tool/common/interfaces';

interface Params {
	parameters: Record<string, ParameterDefinition>;
}

export const getRequiredParameters = ({ parameters }: Params): string[] => {
	return Object.entries(parameters)
		.filter(([_, parameterDefinition]) => parameterDefinition.required)
		.map(([name]) => name);
};
