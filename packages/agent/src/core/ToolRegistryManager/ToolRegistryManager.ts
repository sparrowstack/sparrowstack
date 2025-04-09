import { ProviderName } from '@sparrowstack/core';
import { Tool, type ToolParams } from '@sparrowstack/tool';
import { createToolRegistryMap } from '@core/ToolRegistryManager/common/utils';
import { type ToolRegistry } from '@core/ToolRegistryManager/common/interfaces';

export class ToolRegistryManager {
	private readonly toolRegistry: ToolRegistry;

	constructor({ tools }: { tools?: Tool[] | ToolParams[] }) {
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

	public getToolSchemas<SchemaType>({
		providerName,
	}: {
		providerName: ProviderName;
	}): SchemaType[] {
		return this.getTools().map((tool) =>
			tool.getSchema<SchemaType>({ providerName }),
		);
	}

	public getToolNames() {
		return Object.keys(this.toolRegistry);
	}
}
