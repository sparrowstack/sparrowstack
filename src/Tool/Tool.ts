import { Provider } from '@Agent';
import { providerSchemas } from '@Tool/common/constants';
import type { IParameterDefinition } from '@Tool/common/interfaces';

export interface IConstructorParams {
	name: string;
	description: string;
	function: (...args: unknown[]) => Promise<unknown>;
	parameters?: Record<string, IParameterDefinition>;
}

export class Tool {
	public name: string;
	public description: string;
	public function: (...args: unknown[]) => Promise<unknown>;
	public parameters: Record<string, IParameterDefinition>;

	constructor({
		name,
		description,
		function: func,
		parameters = {},
	}: IConstructorParams) {
		this.name = name;
		this.function = func;
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
