import { z } from 'zod';
import { ProviderName } from '@sparrowstack/core';
import { responseFormatAdapters } from '@structured-output/common/constants';

export const getResponseFormat = <ResponseFormat>({
	name,
	zodObject,
	providerName,
}: {
	providerName: ProviderName;
	name: string;
	zodObject: z.ZodObject<any>;
}): ResponseFormat => {
	const toResponseFormat =
		responseFormatAdapters[
			providerName as keyof typeof responseFormatAdapters
		];

	return toResponseFormat<ResponseFormat>({
		name,
		zodObject,
	}) as ResponseFormat;
};
