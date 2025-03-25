import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';

export interface Params {
	name: string;
	zodObject: z.ZodObject<any>;
}

export const zodToOpenAIResponseFormatAdapter = <ResponseFormat>({
	name,
	zodObject,
}: Params): ResponseFormat => {
	const responseFormat = zodResponseFormat(zodObject, name);

	return responseFormat as ResponseFormat;
};
