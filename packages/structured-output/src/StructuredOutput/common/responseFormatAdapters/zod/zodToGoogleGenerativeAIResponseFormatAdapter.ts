import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

export interface ParamsToSchema {
	zodObjectJsonSchema: Record<string, any>;
}

const zodToGeminiSchema = ({ zodObjectJsonSchema }: ParamsToSchema): any => {
	if (
		typeof zodObjectJsonSchema !== 'object' ||
		zodObjectJsonSchema === null
	) {
		return zodObjectJsonSchema;
	}

	if (Array.isArray(zodObjectJsonSchema)) {
		return zodObjectJsonSchema.map((item) =>
			zodToGeminiSchema({ zodObjectJsonSchema: item }),
		); // Important: wrap item in object
	}

	const adaptedSchema: any = {};

	for (const key in zodObjectJsonSchema) {
		if (key === '$schema' || key === 'additionalProperties') {
			continue;
		}

		if (key === 'properties') {
			adaptedSchema[key] = {};
			for (const propKey in zodObjectJsonSchema[key]) {
				adaptedSchema[key][propKey] = zodToGeminiSchema({
					zodObjectJsonSchema: zodObjectJsonSchema[key][propKey],
				}); // Important: wrap in object
			}
		} else if (key === 'items') {
			adaptedSchema[key] = zodToGeminiSchema({
				zodObjectJsonSchema: zodObjectJsonSchema[key],
			}); // Important: wrap in object
		} else {
			adaptedSchema[key] = zodObjectJsonSchema[key];
		}

		if (key === 'explanation' || key === 'output') {
			adaptedSchema[key] = { type: 'string' };
		}
	}

	return adaptedSchema;
};

export interface ParamsFormatAdapter {
	zodObject: z.ZodObject<any, any, any, any, any>;
}

export const zodToGoogleGenerativeAIResponseFormatAdapter = <ResponseFormat>({
	zodObject,
}: ParamsFormatAdapter): ResponseFormat => {
	const zodObjectJsonSchema = zodToJsonSchema(zodObject);
	const schema = zodToGeminiSchema({ zodObjectJsonSchema });

	return schema;
};
