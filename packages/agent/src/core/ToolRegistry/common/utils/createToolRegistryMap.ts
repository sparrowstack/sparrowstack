import { Tool, type IToolParams } from '@sparrowstack/tool';
import { getInstantiatedTools } from '@core/ToolRegistry/common/utils';
import { type IToolRegistry } from '@core/ToolRegistry/common/interfaces';

interface IParams {
	tools?: Tool[] | IToolParams[];
}

export const createToolRegistryMap = ({ tools }: IParams): IToolRegistry => {
	const instantiatedTools = getInstantiatedTools({ tools });

	// If no tools provided, return an empty object
	// Otherwise, reduce the array of tools into an object
	// where keys are tool names
	return Array.isArray(tools) && tools.length === 0
		? {}
		: instantiatedTools.reduce((registry: IToolRegistry, tool: Tool) => {
				registry[tool.name] = tool;
				return registry;
			}, {});
};
