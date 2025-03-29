import type { ResponseFormatZod } from '@core/StucturedOutputFactory/common/types';

export type ResponseFormat = {
	name: string;
	responseFormat: ResponseFormatZod;
};
