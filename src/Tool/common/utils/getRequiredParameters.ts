import type { IParameterDefinition } from '@Tool/common/interfaces';

interface IOptions {
	parameters: Record<string, IParameterDefinition>;
}

export const getRequiredParameters = ({ parameters }: IOptions): string[] => {
	return Object.entries(parameters)
		.filter(([_, parameterDefinition]) => parameterDefinition.required)
		.map(([name]) => name);
};
