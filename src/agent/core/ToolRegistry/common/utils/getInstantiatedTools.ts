import { Tool, type IToolParams } from '@sparrowstack/tool';

export const getInstantiatedTools = ({
	tools,
}: {
	tools?: Tool[] | IToolParams[];
}) => {
	return (
		tools?.map((tool) => {
			const isToolInstance = tool instanceof Tool;

			return isToolInstance ? tool : new Tool(tool);
		}) ?? []
	);
};
