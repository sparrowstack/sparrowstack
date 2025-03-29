import type { ProviderName } from '@sparrowstack/core';
import type { StructuredOutput } from '@sparrowstack/structured-output';
import type {
	ResponseFormat,
	ResponseFormatZod,
} from '@core/StucturedOutputFactory/common/types';

export interface StructuredOutputCreateParams {
	providerName: ProviderName;
	responseFormat?: ResponseFormatZod | ResponseFormat;
	strucuturedOutput?: StructuredOutput;
}
