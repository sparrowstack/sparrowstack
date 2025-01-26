import { Tool, type IToolParams } from '@Tool';
import { type IToolRegistry } from '@Agent/core/ToolsFactory/common/interfaces';

export class ToolsFactory {
	public static create({
		tools,
	}: {
		tools?: Tool[] | IToolParams[];
	}): IToolRegistry | undefined {
		if (!tools) return undefined;

		const instantiatedTools = tools.map((tool) => {
			return tool instanceof Tool ? tool : new Tool(tool);
		});

		const functions = instantiatedTools.reduce(
			(accumulator, tool) => ({
				...accumulator,
				[tool.name]: tool.function,
			}),
			{} as Record<Tool['name'], Tool['function']>,
		);

		return { functions, tools: instantiatedTools };
	}
}
