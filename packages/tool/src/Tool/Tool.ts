import { ZodObject } from 'zod';
import { Type } from '@tool/common/enums';
import { ProviderName } from '@sparrowstack/core';
import { providerSchemas } from '@tool/common/constants';
import type {
	ToolParams,
	CachedResult,
	NeedsPermission,
} from '@tool/common/interfaces';
import type {
	Validate,
	Parameters,
	ToolFunction,
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
	readonly needsPermission?: NeedsPermission;
	readonly structuredOutput?: ZodObject<any, any, any, any, any>;
	readonly validationFailedMessage?: string | CallableFunctionResponseMessage;
	readonly maxCallCountExceededMessage?:
		| string
		| CallableFunctionResponseMessage;

	private callCount: number;
	private lastCachedResult?: CachedResult;
	private cachedResults: CachedResult[];

	constructor({
		name,
		validate,
		description,
		maxCallCount,
		parameters = {},
		needsPermission,
		structuredOutput,
		function: toolFunction,
		validationFailedMessage,
		maxCallCountExceededMessage,
	}: ToolParams) {
		this.name = name;
		this.callCount = 0;
		this.cachedResults = [];
		this.validate = validate;
		this.function = toolFunction;
		this.parameters = parameters;
		this.description = description;
		this.maxCallCount = maxCallCount;
		this.needsPermission = needsPermission;
		this.structuredOutput = structuredOutput;
		this.validationFailedMessage = validationFailedMessage;
		this.maxCallCountExceededMessage = maxCallCountExceededMessage;
		// synonyms
		// antonyms
	}

	public getSchema<SchemaType>({
		providerName,
	}: {
		providerName: ProviderName;
	}): SchemaType {
		const toSchema =
			providerSchemas[providerName as keyof typeof providerSchemas];

		return toSchema<SchemaType>({
			name: this.name,
			parameters: this.parameters,
			description: this.description,
			structuredOutput: this.structuredOutput,
		}) as SchemaType;
	}

	// Setters
	public incrementCallCount() {
		this.callCount += 1;
	}

	public addCachedResult({ result }: { result: CachedResult }) {
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
