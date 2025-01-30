import type { Validate } from '@Tool/common/types';
import { providerSchemas } from '@Tool/common/constants';
import { ProviderName } from '@Agent/core/providers/BaseProvider/common/enums/ProviderName';
import type {
	IToolParams,
	IParameterDefinition,
} from '@Tool/common/interfaces';

export class Tool {
	public name: string;
	public callCount: number;
	public description: string;
	public validate?: Validate;
	public function: (...args: unknown[]) => Promise<unknown>;
	public parameters: Record<string, IParameterDefinition>;

	constructor({
		name,
		validate,
		description,
		function: func,
		parameters = {},
	}: IToolParams) {
		this.name = name;
		this.callCount = 0;
		this.function = func;
		this.validate = validate;
		this.description = description;
		this.parameters = parameters;
		// synonyms
		// antonyms
	}

	public getSchema({ providerName }: { providerName: ProviderName }) {
		const toSchema = providerSchemas[providerName];

		return toSchema({
			name: this.name,
			parameters: this.parameters,
			description: this.description,
		});
	}
}
