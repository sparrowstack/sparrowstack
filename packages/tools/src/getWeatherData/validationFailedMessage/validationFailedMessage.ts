import { type RuntimeParams } from '@sparrowstack/tool';
import { type WeatherData } from '@tools/getWeatherData/function/common/interfaces';

export const validationFailedMessage = async (runtimeParams: RuntimeParams) => {
	const { lastCachedResult } = runtimeParams;
	const result = lastCachedResult?.result as WeatherData;

	return `
Validation Failed: This user is rate limited to one 'getWeather' request per minute.

Please see results from the last 'getWeather' request:
${JSON.stringify(result)}
`;
};
