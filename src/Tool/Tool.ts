import { Provider } from '@Agent';
import { providerSchemas } from '@Tool/common/constants';
import type { IParameterDefinition } from '@Tool/common/interfaces';

interface IConstructorOptions {
	name: string;
	description: string;
	method: (...args: unknown[]) => Promise<unknown>;
	parameters?: Record<string, IParameterDefinition>;
}

export class Tool {
	private name: string;
	private description: string;
	private parameters: Record<string, IParameterDefinition>;
	public method: (...args: unknown[]) => Promise<unknown>;

	constructor({
		name,
		method,
		parameters = {},
		description,
	}: IConstructorOptions) {
		this.name = name;
		this.method = method;
		this.description = description;
		this.parameters = parameters;
	}

	public getSchema({ provider }: { provider: Provider }) {
		const toSchema = providerSchemas[provider];

		return toSchema({
			name: this.name,
			description: this.description,
			parameters: this.parameters,
		});
	}
}

// Example usage:
const helloWorldTool = new Tool({
	name: 'helloWorld',
	description: 'Return a simple greeting',
	method: async () => {
		return 'Hello, world!';
	},
});

console.log(helloWorldTool.getSchema({ provider: Provider.Anthropic }));
console.log(helloWorldTool.getSchema({ provider: Provider.OpenAI }));
