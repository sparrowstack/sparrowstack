import type { StructuredOutput } from '@sparrowstack/structured-output';
import type {
	ResponseFormat,
	ResponseFormatZod,
} from '@core/StucturedOutputFactory/common/types';

export interface StructuredOutputCreateParams {
	responseFormat?: ResponseFormatZod | ResponseFormat | StructuredOutput;
}
