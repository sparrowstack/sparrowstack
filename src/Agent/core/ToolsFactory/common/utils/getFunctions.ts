import { Tool } from '@Tool';

export const getFunctions = ({ tools }: { tools: Tool[] }) => {
	return (
		tools?.reduce(
			(accumulator, tool) => ({
				...accumulator,
				[tool.name]: tool.function,
			}),
			{} as Record<Tool['name'], Tool['function']>,
		) ?? {}
	);
};
