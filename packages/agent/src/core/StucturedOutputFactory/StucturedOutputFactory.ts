import { StructuredOutput } from '@sparrowstack/structured-output';
import type { StructuredOutputCreateParams } from '@core/StucturedOutputFactory/common/interfaces';

export class StructuredOutputFactory {
	static create({
		providerName,
		responseFormat,
		strucuturedOutput: strucuturedOutputInstance,
	}: StructuredOutputCreateParams): Record<string, unknown> | null {
		let structuredOutput: Record<string, unknown> | null = null;

		if (strucuturedOutputInstance) {
			structuredOutput = strucuturedOutputInstance.getResponseFormat({
				providerName,
			});
		} else if (responseFormat && 'name' in responseFormat) {
			structuredOutput = new StructuredOutput({
				name: responseFormat.name,
				strucuturedOutput: responseFormat.responseFormat,
			}).getResponseFormat({
				providerName,
			});
		} else if (responseFormat && !('name' in responseFormat)) {
			structuredOutput = new StructuredOutput({
				strucuturedOutput: responseFormat,
			}).getResponseFormat({
				providerName,
			});
		}

		return structuredOutput;
	}
}
