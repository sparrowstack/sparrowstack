import { Tool, type ToolParams } from '@sparrowstack/tool';
import { getInstantiatedTools } from '@core/ToolRegistryManager/common/utils';
import { type ToolRegistry } from '@core/ToolRegistryManager/common/interfaces';

interface Params {
	tools?: Tool[] | ToolParams[];
}

export const createToolRegistryMap = ({ tools }: Params): ToolRegistry => {
	const instantiatedTools = getInstantiatedTools({ tools });

	// If no tools provided, return an empty object
	// Otherwise, reduce the array of tools into an object
	// where keys are tool names
	return Array.isArray(tools) && tools.length === 0
		? {}
		: instantiatedTools.reduce((registry: ToolRegistry, tool: Tool) => {
				registry[tool.name] = tool;
				return registry;
			}, {});
};
