import { Tool, type IToolParams } from '@Tool';
import { type IToolRegistry } from '@Agent/core/ToolsFactory/common/interfaces';
import {
	getFunctions,
	getInstantiatedTools,
} from '@Agent/core/ToolsFactory/common/utils';

export class ToolsFactory {
	public static create({
		tools,
	}: {
		tools?: Tool[] | IToolParams[];
	}): IToolRegistry {
		const instantiatedTools = getInstantiatedTools({ tools });

		const functions = getFunctions({ tools: instantiatedTools });

		return { functions, tools: instantiatedTools };
	}
}
