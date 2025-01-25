import { Provider } from '@Agent';
import { providerSchemas } from '@Tool/common/constants';
import type {
	IToolParams,
	IParameterDefinition,
} from '@Tool/common/interfaces';

// TODO: Add
// args
// validate
// maxCount
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
	}: IToolParams) {
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
