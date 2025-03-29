import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

export interface Params {
	zodObject: z.ZodObject<any>;
}

export const zodToAnthropicResponseFormatAdapter = <ResponseFormat>({
	zodObject,
}: Params): ResponseFormat => {
	const responseFormat = zodToJsonSchema(zodObject);

	return responseFormat as ResponseFormat;
};
