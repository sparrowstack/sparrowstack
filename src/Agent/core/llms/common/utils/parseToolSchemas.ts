import type {
	IToolCalls,
	IToolSchema,
} from '@Agent/core/Tools/common/interfaces';

export const parseToolSchemas = ({ tools }: { tools: IToolSchema[] }) => {
	return {
		tools: tools.map((obj) => obj.tool),
		toolCalls: tools.reduce(
			(acc, obj) => ({
				...acc,
				[obj.toolCall.name]: obj.toolCall.method,
			}),
			{} as IToolCalls,
		),
	};
};
