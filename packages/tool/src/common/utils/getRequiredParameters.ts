import type { IParameterDefinition } from '@sparrowstack/tool/common/interfaces';

interface IParams {
	parameters: Record<string, IParameterDefinition>;
}

export const getRequiredParameters = ({ parameters }: IParams): string[] => {
	return Object.entries(parameters)
		.filter(([_, parameterDefinition]) => parameterDefinition.required)
		.map(([name]) => name);
};
