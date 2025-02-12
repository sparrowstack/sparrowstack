import { type IRuntimeParams } from '@sparrowstack/tool';
import { type IWeatherData } from '@sparrowstack/tools/src/getWeatherData/function/common/interfaces';

export const validationFailedMessage = async (
	runtimeParams: IRuntimeParams,
) => {
	const { lastCachedResult } = runtimeParams;
	const result = lastCachedResult?.result as IWeatherData;

	return `
Validation Failed: This user is rate limited to one 'getWeather' request per minute.

Please see results from the last 'getWeather' request:
${JSON.stringify(result)}
`;
};
