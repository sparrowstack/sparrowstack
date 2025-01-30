import { Tool, type IToolParams } from '@Tool';
import { type IToolRegistry } from '@Agent/core/ToolRegistryFactory/common/interfaces';
import { getInstantiatedTools } from '@Agent/core/ToolRegistryFactory/common/utils';

export class ToolRegistryFactory {
	public static create({
		tools,
	}: {
		tools?: Tool[] | IToolParams[];
	}): IToolRegistry {
		const instantiatedTools = getInstantiatedTools({ tools });

		// If no tools provided, return an empty object
		// Otherwise, reduce the array of tools into an object
		// where keys are tool names
		return Array.isArray(tools) && tools.length === 0
			? {}
			: instantiatedTools.reduce(
					(registry: IToolRegistry, tool: Tool) => {
						registry[tool.name] = tool;
						return registry;
					},
					{},
				);
	}
}
