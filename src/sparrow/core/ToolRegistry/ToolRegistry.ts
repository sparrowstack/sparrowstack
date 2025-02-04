import { Tool, type IToolParams } from '@tool';
import { createToolRegistryMap } from '@sparrow/core/ToolRegistry/common/utils';
import { type IToolRegistry } from '@sparrow/core/ToolRegistry/common/interfaces';
import { ProviderName } from '@sparrow/core/providers/BaseProvider/common/enums/ProviderName';

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
