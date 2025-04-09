import { Tool, Type, type ToolParams } from '@sparrowstack/tool';

export const getInstantiatedTools = ({
	tools,
}: {
	tools?: Tool[] | ToolParams[];
}) => {
	return (
		tools?.map((tool) => {
			const isToolInstance = 'type' in tool && tool.type === Type.Tool;

			return isToolInstance ? tool : new Tool(tool);
		}) ?? []
	);
};
