import { type IRuntimeParams } from '@/packages/sparrowstack/tool';
import { type IWeatherData } from '@/packages/tools/getWeatherData/function/common/interfaces';
import { checkHasExceededRateLimit } from '@/packages/tools/getWeatherData/validate/common/utils';

export const validateGetWeatherDataToolCall = async (
	runtimeParams: IRuntimeParams,
) => {
	let shouldCallTool = true;
	const maxRequestIntervalMinutes = 1;
	const { lastCachedResult } = runtimeParams;
	const result = lastCachedResult?.result as IWeatherData;

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
