import { type RuntimeParams } from '@sparrowstack/tool';
import { type WeatherData } from '@tools/getWeatherData/function/common/interfaces';
import { checkHasExceededRateLimit } from '@tools/getWeatherData/validate/common/utils';

export const validateGetWeatherDataToolCall = async (
	runtimeParams: RuntimeParams,
) => {
	let shouldCallTool = true;
	const maxRequestIntervalMinutes = 1;
	const { lastCachedResult } = runtimeParams;
	const result = lastCachedResult?.result as WeatherData;

	if (result) {
		const lastRequestTimeUTC = result.requestTime.utc;
		const lastRequestTime = new Date(lastRequestTimeUTC);
		const hasExceededRateLimit = checkHasExceededRateLimit({
			lastRequestTime,
			maxRequestIntervalMinutes,
		});

		if (hasExceededRateLimit) {
			shouldCallTool = false;
		}
	}

	return shouldCallTool;
};
