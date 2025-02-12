import { ProviderName } from '@sparrowstack/core';
import { Tool, type IToolParams } from '@sparrowstack/tool';
import { createToolRegistryMap } from '@core/ToolRegistry/common/utils';
import { type IToolRegistry } from '@core/ToolRegistry/common/interfaces';

export class ToolRegistry {
	private readonly toolRegistry: IToolRegistry;

	constructor({ tools }: { tools?: Tool[] | IToolParams[] }) {
		this.toolRegistry = createToolRegistryMap({ tools });
	}

	public getToolRegistry() {
		return this.toolRegistry;
	}

	public getToolByName({ name }: { name: string }) {
		return this.toolRegistry[name];
	}

	public getTools() {
		return Object.values(this.toolRegistry);
	}

	public getToolSchemas({ providerName }: { providerName: ProviderName }) {
		return this.getTools().map((tool) => tool.getSchema({ providerName }));
	}

	public getToolNames() {
		return Object.keys(this.toolRegistry);
	}
}
