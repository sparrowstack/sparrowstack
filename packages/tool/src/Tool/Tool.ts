import { Type } from '@tool/common/enums';
import { ProviderName } from '@sparrowstack/core';
import { providerSchemas } from '@tool/common/constants';
import type { IToolParams } from '@tool/common/interfaces';
import type { ICachedResult } from '@tool/common/interfaces/ICachedResult';
import type {
	Validate,
	ToolFunction,
	Parameters,
	CallableFunctionResponseMessage,
} from '@tool/common/types';

export class Tool {
	readonly name: string;
	readonly description: string;
	readonly validate?: Validate;
	readonly function: ToolFunction;
	readonly maxCallCount?: number;
	readonly parameters: Parameters;
	readonly type = Type.Tool as const;

	readonly validationFailedMessage?: string | CallableFunctionResponseMessage;
	readonly maxCallCountExceededMessage?:
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
		maxCallCountExceededMessage,
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
		this.maxCallCountExceededMessage = maxCallCountExceededMessage;
		// synonyms
		// antonyms
	}

	public getSchema({ providerName }: { providerName: ProviderName }) {
		const toSchema =
			providerSchemas[providerName as keyof typeof providerSchemas];

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
