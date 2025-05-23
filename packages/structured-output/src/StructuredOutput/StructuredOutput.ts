import { z } from 'zod';
import { ProviderName } from '@sparrowstack/core';
import { Name } from '@structured-output/common/enums';
import { getResponseFormat } from '@structured-output/methods';
import type { StructuredOutputConstructorParams } from '@structured-output/common/interfaces';

export class StructuredOutput {
	readonly name: string;
	readonly strucuturedOutput: z.ZodObject<any>;

	constructor({
		name = Name.Default,
		strucuturedOutput,
	}: StructuredOutputConstructorParams) {
		this.name = name;
		this.strucuturedOutput = strucuturedOutput;
	}

	public getResponseFormat<ResponseFormat>({
		providerName,
	}: {
		providerName: ProviderName;
	}): ResponseFormat {
		const responseFormat = getResponseFormat<ResponseFormat>({
			providerName,
			name: this.name,
			zodObject: this.strucuturedOutput,
		});

		return responseFormat;
	}
}
