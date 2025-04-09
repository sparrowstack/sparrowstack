import type { FunctionDeclarationsTool } from '@google/generative-ai';

interface IParams {
	model: string;
	tools: FunctionDeclarationsTool[];
}

export const buildModelParams = ({ model, tools }: IParams) => {
	return {
		model,
		tools,
	};
};
