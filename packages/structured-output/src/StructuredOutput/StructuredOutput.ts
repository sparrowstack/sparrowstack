import { z } from 'zod';
import { ProviderName } from '@sparrowstack/core';
import { getResponseFormat } from '@structured-output/methods';

interface Params {
	name: string;
	strucuturedOutput: z.ZodObject<any>;
}

export class StructuredOutput {
	readonly name: string;
	readonly strucuturedOutput: z.ZodObject<any>;

	constructor({ name, strucuturedOutput }: Params) {
		this.name = name;
		this.strucuturedOutput = strucuturedOutput;
	}

	public getResponseFormat<ResponseFormat>({
		providerName,
	}: {
		providerName: ProviderName;
	}): ResponseFormat {
		return getResponseFormat<ResponseFormat>({
			providerName,
			name: this.name,
			zodObject: this.strucuturedOutput,
		});
	}
}
