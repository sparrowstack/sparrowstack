import { providerSchemas } from '@Tool/common/constants';
import type { IToolParams } from '@Tool/common/interfaces';
import type { Validate, ToolFunction, Parameters } from '@Tool/common/types';
import { ProviderName } from '@Agent/core/providers/BaseProvider/common/enums/ProviderName';

export class Tool {
	// TODO: make any private / readonly?
	public name: string;
	public callCount: number;
	public description: string;
	public validate?: Validate;
	public function: ToolFunction;
	public maxCallCount?: number;
	public parameters: Parameters;
	public cachedResults: any[];
	public lastCachedResult: any;

	constructor({
		name,
		validate,
		description,
		maxCallCount,
		parameters = {},
		function: toolFunction,
	}: IToolParams) {
		this.name = name;
		this.callCount = 0;
		this.validate = validate;
		this.function = toolFunction;
		this.parameters = parameters;
		this.description = description;
		this.maxCallCount = maxCallCount;
		this.cachedResults = [];
		this.lastCachedResult = null;
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

	public addCachedResult({ result }: { result: any }) {
		this.cachedResults.push(result);
		this.lastCachedResult = result;
	}
}
