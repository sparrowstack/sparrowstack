import { providerSchemas } from '@Tool/common/constants';
import type { IToolParams } from '@Tool/common/interfaces';
import type { Validate, ToolFunction, Parameters } from '@Tool/common/types';
import { ProviderName } from '@Agent/core/providers/BaseProvider/common/enums/ProviderName';

export class Tool {
	// TODO: make any private / readonly?
	readonly name: string;
	readonly description: string;
	readonly validate?: Validate;
	readonly function: ToolFunction;
	readonly maxCallCount?: number;
	readonly parameters: Parameters;

	private callCount: number;
	private lastCachedResult: any;
	private cachedResults: any[];

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

	// Setters
	public incrementCallCount() {
		this.callCount += 1;
	}

	public addCachedResult({ result }: { result: any }) {
		this.cachedResults.push(result);
		this.lastCachedResult = result;
	}

	// Getters
	public getCallCount() {
		return this.callCount;
	}

	public getLastCachedResult() {
		return this.lastCachedResult;
	}

	public getCachedResults() {
		return this.cachedResults;
	}
}
