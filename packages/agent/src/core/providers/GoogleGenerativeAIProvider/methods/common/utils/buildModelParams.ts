import type { FunctionDeclarationsTool } from '@google/generative-ai';

interface Params {
	model: string;
	tools: FunctionDeclarationsTool[];
}

export const buildModelParams = ({ model, tools }: Params) => {
	return {
		model,
		tools,
	};
};
