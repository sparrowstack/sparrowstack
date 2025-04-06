import { StructuredOutput } from '@sparrowstack/structured-output';
import type { StructuredOutputCreateParams } from '@core/StucturedOutputFactory/common/interfaces';

export class StructuredOutputFactory {
	static create({
		providerName,
		responseFormat,
		strucuturedOutput: strucuturedOutputInstance,
	}: StructuredOutputCreateParams): Record<string, unknown> | null {
		let responseFormatAgent: Record<string, unknown> | null = null;

		if (strucuturedOutputInstance) {
			responseFormatAgent = strucuturedOutputInstance.getResponseFormat({
				providerName,
			});
		} else if (responseFormat && 'name' in responseFormat) {
			responseFormatAgent = new StructuredOutput({
				name: responseFormat.name,
				strucuturedOutput: responseFormat.responseFormat,
			}).getResponseFormat({
				providerName,
			});
		} else if (responseFormat && !('name' in responseFormat)) {
			responseFormatAgent = new StructuredOutput({
				strucuturedOutput: responseFormat,
			}).getResponseFormat({
				providerName,
			});
		}

		return responseFormatAgent;
	}
}
