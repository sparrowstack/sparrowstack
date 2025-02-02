import { providerSchemas } from '@Tool/common/constants';
import type { IToolParams } from '@Tool/common/interfaces';
import { ProviderName } from '@Agent/core/providers/BaseProvider/common/enums/ProviderName';
import type { ICachedResult } from '@Tool/common/interfaces/ICachedResult';
import type {
	Validate,
	ToolFunction,
	Parameters,
	CallableFunctionResponseMessage,
} from '@Tool/common/types';

export class Tool {
	readonly name: string;
	readonly description: string;
	readonly validate?: Validate;
	readonly function: ToolFunction;
	readonly maxCallCount?: number;
	readonly parameters: Parameters;

	readonly validationFailedMessage?: string | CallableFunctionResponseMessage;
	readonly maxCallCountExceededResponse?:
		| string
		| CallableFunctionResponseMessage;

	private callCount: number;
	private lastCachedResult?: ICachedResult;
	private cachedResults: ICachedResult[];

	constructor({
		name,
		validate,
		description,
		maxCallCount,
		parameters = {},
		function: toolFunction,
		validationFailedMessage,
		maxCallCountExceededResponse,
	}: IToolParams) {
		this.name = name;
		this.callCount = 0;
		this.cachedResults = [];
		this.validate = validate;
		this.function = toolFunction;
		this.parameters = parameters;
		this.description = description;
		this.maxCallCount = maxCallCount;
		this.validationFailedMessage = validationFailedMessage;
		this.maxCallCountExceededResponse = maxCallCountExceededResponse;
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

	public addCachedResult({ result }: { result: ICachedResult }) {
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
