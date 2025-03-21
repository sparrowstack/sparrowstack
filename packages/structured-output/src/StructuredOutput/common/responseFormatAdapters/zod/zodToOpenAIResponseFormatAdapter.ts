import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';

interface Params {
	name: string;
	zodObject: z.ZodObject<any>;
}

export const zodToOpenAIResponseFormatAdapter = ({
	name,
	zodObject,
}: Params) => {
	const responseFormat = zodResponseFormat(zodObject, name);

	return responseFormat;
};
