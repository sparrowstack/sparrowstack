import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

export interface Params {
	zodObject: z.ZodObject<any>;
}

export const zodToGoogleGenerativeAIResponseFormatAdapter = <ResponseFormat>({
	zodObject,
}: Params): ResponseFormat => {
	const responseFormat = zodToJsonSchema(zodObject);

	return responseFormat as ResponseFormat;
};
