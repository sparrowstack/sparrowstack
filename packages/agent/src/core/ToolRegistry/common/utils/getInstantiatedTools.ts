import { Tool, Type, type IToolParams } from '@sparrowstack/tool';

export const getInstantiatedTools = ({
	tools,
}: {
	tools?: Tool[] | IToolParams[];
}) => {
	return (
		tools?.map((tool) => {
			const isToolInstance = 'type' in tool && tool.type === Type.Tool;

			return isToolInstance ? tool : new Tool(tool);
		}) ?? []
	);
};
