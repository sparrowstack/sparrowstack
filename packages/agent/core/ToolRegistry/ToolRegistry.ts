import { Tool, type IToolParams } from '@/packages/tool';
import { createToolRegistryMap } from '@/packages/agent/core/ToolRegistry/common/utils';
import { type IToolRegistry } from '@/packages/agent/core/ToolRegistry/common/interfaces';
import { ProviderName } from '@/packages/agent/core/providers/BaseProvider/common/enums/ProviderName';

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
