import { StructuredOutput } from '@sparrowstack/structured-output';
import type { StructuredOutputCreateParams } from '@core/StucturedOutputFactory/common/interfaces';

export class StructuredOutputFactory {
	static create({
		responseFormat,
	}: StructuredOutputCreateParams): StructuredOutput | undefined {
		let structuredOutput: StructuredOutput | undefined = undefined;

		if (responseFormat instanceof StructuredOutput) {
			structuredOutput = responseFormat;
		} else if (responseFormat && 'name' in responseFormat) {
			structuredOutput = new StructuredOutput({
				name: responseFormat.name,
				strucuturedOutput: responseFormat.responseFormat,
			});
		} else if (responseFormat && !('name' in responseFormat)) {
			structuredOutput = new StructuredOutput({
				strucuturedOutput: responseFormat,
			});
		}

		return structuredOutput;
	}
}
